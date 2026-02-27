# DreamX Studio 后端实现计划

## 技术选型

### 后端框架
- **FastAPI** (Python) — async 原生，SSE 支持好，FaaS 部署友好
- **Pydantic** — 数据验证和序列化
- **SQLAlchemy 2.0** — ORM，async 支持
- **Alembic** — 数据库迁移

### 数据库
- **PostgreSQL** — 主数据库
- **Redis** — 缓存 + 任务队列 broker

### 任务队列
- **Celery** — 分布式任务队列
- **Celery Beat** — 定时任务调度

### 部署
- **阿里云函数计算 FC** — 国内首选 FaaS
- **Docker** — 容器化部署

## 数据模型设计

参考 Drama.Land 调研文档设计：

```python
# 用户系统
class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    firebase_uid = Column(String(128), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    nickname = Column(String(64))
    avatar = Column(String(512))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    # Relationships
    subscription = relationship("Subscription", back_populates="user", uselist=False)
    credits = relationship("Credit", back_populates="user")
    projects = relationship("Project", back_populates="user")
    tasks = relationship("UserTask", back_populates="user")


class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"), unique=True)
    tier = Column(Enum("STARTER", "BASIC", "PLUS", "PRO", "ULTRA"))
    status = Column(Enum("ACTIVE", "CANCELLED", "EXPIRED"))
    credits_balance = Column(Integer, default=0)
    renew_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)


class Credit(Base):
    __tablename__ = "credits"
    
    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"))
    amount = Column(Integer)
    type = Column(Enum("EARNED", "PURCHASED", "CONSUMED"))
    description = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)


# 项目系统
class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"))
    type = Column(Enum("single_episode", "multi_episodes", "script_based", "music_mv", "redbook_note"))
    series_title = Column(String(255))
    drama_cover = Column(String(512))
    current_state = Column(Enum("check_point", "story_bible", "character_pack", "planning_center", "script", "scene_design", "segment_design", "compose"))
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    series = relationship("Series", back_populates="project", uselist=False)


class Series(Base):
    __tablename__ = "series"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(36), ForeignKey("projects.id"), unique=True)
    state = Column(Enum("check_point", "story_bible", "character_pack", "planning_center", "script", "scene_design", "segment_design", "compose"))
    
    # CheckPoint data
    language = Column(String(16), default="zh-CN")
    rating = Column(String(8), default="PG")
    visual_style_id = Column(Integer)
    episode_count = Column(Integer, default=1)
    episode_duration = Column(Integer, default=60)
    camera_frame_ratio = Column(String(8), default="9:16")
    idea_text = Column(Text)
    
    # Relationships
    project = relationship("Project", back_populates="series")
    characters = relationship("Character", back_populates="series")
    episodes = relationship("Episode", back_populates="series")


class Character(Base):
    __tablename__ = "characters"
    
    id = Column(String(36), primary_key=True)
    series_id = Column(String(36), ForeignKey("series.id"))
    name = Column(String(64))
    occupation = Column(String(128))
    level = Column(Enum("major", "supporting", "minor", "extra"))
    gender = Column(String(16))
    age = Column(String(32))
    height = Column(String(16))
    brief_bio = Column(Text)
    appearance = Column(Text)
    image_url = Column(String(512))
    voice_id = Column(String(128))
    created_at = Column(DateTime, default=datetime.utcnow)


class Episode(Base):
    __tablename__ = "episodes"
    
    id = Column(String(36), primary_key=True)
    series_id = Column(String(36), ForeignKey("series.id"))
    episode_number = Column(Integer)
    title = Column(String(255))
    summary = Column(Text)
    script = Column(JSON)  # 存储分场剧本
    created_at = Column(DateTime, default=datetime.utcnow)


# 资产库
class VisualStyle(Base):
    __tablename__ = "visual_styles"
    
    id = Column(Integer, primary_key=True)
    title = Column(String(128))
    type = Column(String(64))
    description = Column(Text)
    img_url = Column(String(512))


class Voice(Base):
    __tablename__ = "voices"
    
    id = Column(String(128), primary_key=True)
    name = Column(String(64))
    description = Column(Text)
    audio_url = Column(String(512))
    age = Column(JSON)  # ["Adult", "Middle-Aged"]
    language = Column(String(16))
    gender = Column(String(16))
```

## API 接口设计

参考 Drama.Land 接口规范：

### 用户模块
```
GET  /api/v1/user/info              # 获取用户信息
GET  /api/v1/user/credits           # 积分汇总
POST /api/v1/user/daily-check       # 每日签到
```

### 项目模块
```
GET  /api/v1/projects               # 项目列表
POST /api/v1/projects               # 创建项目
GET  /api/v1/projects/{id}          # 项目详情
POST /api/v1/projects/{id}/resume   # 恢复项目
```

### 画布模块
```
POST /api/v1/canvas/query           # 查询画布状态
POST /api/v1/canvas/checkpoint      # 更新基础信息
POST /api/v1/canvas/story-bible     # 生成故事圣经
POST /api/v1/canvas/characters      # 生成角色集
POST /api/v1/canvas/script          # 生成剧本
POST /api/v1/canvas/scene-design    # 场景设计
POST /api/v1/canvas/segment-design  # 分镜设计
POST /api/v1/canvas/compose         # 合成导出
```

### 资产模块
```
GET  /api/v1/visual-styles          # 视觉风格列表
GET  /api/v1/voices                 # 配音列表
GET  /api/v1/showcases              # 档案馆作品
```

### AI 生成（SSE）
```
GET  /api/v1/ai/generate/stream     # SSE 进度推送
```

## 项目结构

```
dreamx-backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 应用入口
│   ├── config.py            # 配置管理
│   ├── database.py          # 数据库连接
│   ├── models/              # SQLAlchemy 模型
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   └── asset.py
│   ├── schemas/             # Pydantic 模式
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── project.py
│   │   └── ai.py
│   ├── api/                 # API 路由
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── projects.py
│   │   ├── canvas.py
│   │   └── assets.py
│   ├── services/            # 业务逻辑
│   │   ├── __init__.py
│   │   ├── project_service.py
│   │   ├── ai_service.py
│   │   └── poloai_client.py
│   ├── tasks/               # Celery 任务
│   │   ├── __init__.py
│   │   ├── celery_app.py
│   │   └── ai_tasks.py
│   └── utils/               # 工具函数
│       ├── __init__.py
│       └── sse.py
├── tests/
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

## MVP 实现优先级

### P0 - 核心功能（1-2 周）
1. FastAPI 项目框架
2. PostgreSQL 数据模型 + Alembic 迁移
3. 用户认证（Firebase Auth 集成）
4. 项目 CRUD API
5. 画布状态查询 API
6. PoloAI API 客户端封装

### P1 - AI 生成（2-3 周）
7. 文生图 API 对接（PoloAI）
8. 文生视频 API 对接（PoloAI）
9. SSE 进度推送
10. Celery 任务队列
11. 错误处理和重试机制

### P2 - 商业化（1 周）
12. 积分系统
13. 订阅管理
14. 任务中心

### P3 - 优化（1 周）
15. 缓存优化（Redis）
16. 日志和监控
17. 性能优化

## PoloAI 集成

```python
# app/services/poloai_client.py

import httpx

class PoloAIClient:
    def __init__(self, api_key: str, base_url: str = "https://api.poloai.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.client = httpx.AsyncClient(
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=60.0
        )
    
    async def text_to_image(self, prompt: str, style: str = "") -> str:
        """文生图，返回图片 URL"""
        response = await self.client.post(
            "/v1/images/generations",
            json={
                "prompt": prompt,
                "style": style,
                "n": 1,
                "size": "1024x1024"
            }
        )
        response.raise_for_status()
        return response.json()["data"][0]["url"]
    
    async def text_to_video(self, prompt: str, duration: int = 5) -> str:
        """文生视频，返回视频 URL"""
        response = await self.client.post(
            "/v1/videos/generations",
            json={
                "prompt": prompt,
                "duration": duration
            }
        )
        response.raise_for_status()
        return response.json()["data"][0]["url"]
    
    async def generate_stream(self, task_id: str):
        """SSE 进度推送"""
        async with self.client.stream(
            "GET",
            f"/v1/tasks/{task_id}/stream"
        ) as response:
            async for line in response.aiter_lines():
                yield line
```

## 下一步

1. ✅ 创建后端项目结构
2. ✅ 实现 P0 核心功能
3. ✅ 对接 PoloAI API (前端已完成)
4. ✅ 实现 SSE 进度推送 (前端已完成)
5. ⏳ 后端 PoloAI 服务实现
6. ⏳ 前后端联调
