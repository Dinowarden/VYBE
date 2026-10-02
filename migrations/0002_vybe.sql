-- VYBE product schema. Identity lives in Better Auth (0001_auth).
-- user_id is TEXT to match Better Auth ids. No FK to "user" so this file
-- stays valid if auth tables are applied in a later pass.

create table if not exists profile (
  user_id         text primary key,
  username        text not null unique,
  display_name    text not null,
  bio             text not null default '',
  avatar_url      text,
  banner_url      text,
  date_of_birth   date,
  role            text not null default 'user',
  is_suspended    boolean not null default false,
  follower_count  integer not null default 0,
  following_count integer not null default 0,
  like_count      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint profile_role_chk check (role in ('user', 'moderator', 'admin'))
);

create table if not exists follow (
  follower_id  text not null,
  following_id text not null,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id),
  constraint follow_no_self check (follower_id <> following_id)
);

create table if not exists post (
  id            text primary key,
  author_id     text not null,
  kind          text not null,
  caption       text not null default '',
  visibility    text not null default 'public',
  like_count    integer not null default 0,
  comment_count integer not null default 0,
  share_count   integer not null default 0,
  save_count    integer not null default 0,
  view_count    integer not null default 0,
  is_removed    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint post_kind_chk check (kind in ('text', 'image', 'video')),
  constraint post_visibility_chk check (visibility in ('public'))
);

create table if not exists media (
  id          text primary key,
  post_id     text not null references post (id) on delete cascade,
  kind        text not null,
  url         text not null,
  mime        text,
  width       integer,
  height      integer,
  duration_ms integer,
  size_bytes  integer,
  position    integer not null default 0,
  constraint media_kind_chk check (kind in ('image', 'video', 'poster'))
);

create table if not exists hashtag (
  id         text primary key,
  tag        text not null unique,
  use_count  integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists content_hashtag (
  post_id    text not null references post (id) on delete cascade,
  hashtag_id text not null references hashtag (id) on delete cascade,
  primary key (post_id, hashtag_id)
);

create table if not exists comment (
  id         text primary key,
  post_id    text not null references post (id) on delete cascade,
  author_id  text not null,
  parent_id  text references comment (id) on delete cascade,
  body       text not null,
  like_count integer not null default 0,
  is_removed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists likes (
  user_id     text not null,
  target_type text not null,
  target_id   text not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, target_type, target_id),
  constraint likes_target_chk check (target_type in ('post', 'comment'))
);

create table if not exists save (
  user_id    text not null,
  post_id    text not null references post (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, post_id)
);

create table if not exists share (
  id         text primary key,
  user_id    text not null,
  post_id    text not null references post (id) on delete cascade,
  channel    text not null,
  created_at timestamptz not null default now(),
  constraint share_channel_chk check (channel in ('link', 'native'))
);

create table if not exists notification (
  id           text primary key,
  recipient_id text not null,
  actor_id     text not null,
  type         text not null,
  post_id      text,
  comment_id   text,
  read_at      timestamptz,
  created_at   timestamptz not null default now(),
  constraint notification_type_chk check (type in ('follow', 'like', 'comment', 'share')),
  constraint notification_dedupe unique (recipient_id, actor_id, type, post_id, comment_id)
);

create table if not exists report (
  id          text primary key,
  reporter_id text not null,
  target_type text not null,
  target_id   text not null,
  category    text not null,
  details     text not null default '',
  status      text not null default 'open',
  reviewed_by text,
  reviewed_at timestamptz,
  created_at  timestamptz not null default now(),
  constraint report_target_chk check (target_type in ('user', 'post', 'comment')),
  constraint report_category_chk check (category in (
    'spam', 'harassment', 'hate', 'sexual', 'violence', 'copyright', 'other'
  )),
  constraint report_status_chk check (status in ('open', 'reviewed', 'actioned', 'dismissed'))
);

create table if not exists analytics_event (
  id         text primary key,
  user_id    text,
  name       text not null,
  post_id    text,
  created_at timestamptz not null default now()
);

create index if not exists follow_follower_idx on follow (follower_id, created_at desc);
create index if not exists follow_following_idx on follow (following_id, created_at desc);
create index if not exists post_author_idx on post (author_id, created_at desc);
create index if not exists post_created_idx on post (created_at desc);
create index if not exists post_video_idx on post (kind, created_at desc);
create index if not exists media_post_idx on media (post_id, position);
create index if not exists comment_post_idx on comment (post_id, created_at);
create index if not exists likes_target_idx on likes (target_type, target_id);
create index if not exists notification_inbox_idx on notification (recipient_id, created_at desc);
create index if not exists report_queue_idx on report (status, created_at desc);
create index if not exists analytics_name_idx on analytics_event (name, created_at desc);
