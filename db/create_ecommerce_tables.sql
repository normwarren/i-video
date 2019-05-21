-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-05-07 22:49:28.412
-- tables
-- Table: category-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-05-07 22:49:28.412
-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-05-07 22:49:28.412
-- tables
-- End of file.
-- tables
-- tables

DROP TABLE IF EXISTS ivideo.category;

DROP TABLE IF EXISTS ivideo.cc_transaction;

DROP TABLE IF EXISTS ivideo.coupon;

DROP TABLE IF EXISTS ivideo.product;

DROP TABLE IF EXISTS ivideo.product_category;

DROP TABLE IF EXISTS ivideo.product_statuses;

DROP TABLE IF EXISTS ivideo.product_tag;

DROP TABLE IF EXISTS ivideo.role;

DROP TABLE IF EXISTS ivideo.series_video;

DROP TABLE IF EXISTS ivideo.session;

DROP TABLE IF EXISTS ivideo.subscription_order;

DROP TABLE IF EXISTS ivideo.tag;

DROP TABLE IF EXISTS ivideo. "user";

DROP TABLE IF EXISTS ivideo.user_role;

DROP TABLE IF EXISTS ivideo.video;

DROP TABLE IF EXISTS ivideo.video_series_product;

--
--
--
--
--
CREATE TABLE ivideo.user_login
( user_id serial NOT NULL, 
  username varchar(255), 
  password varchar(255),
      inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT pk_user_login PRIMARY KEY (id))

CREATE TABLE ivideo.category (
    id SERIAL NOT NULL,
    name VARCHAR(255),
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,

    parent_id INTEGER NULL,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_category PRIMARY KEY (
        id
)
);

-- Table: cc_transaction

CREATE TABLE ivideo.cc_transaction (
    id SERIAL NOT NULL,
    code VARCHAR(255) NULL,
    subscription_id INTEGER,
    transdate timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NULL,
    processor VARCHAR(
        255
),
    processor_trans_id VARCHAR(
        255
),
    amount NUMERIC,
    cc_num VARCHAR(
        255
) NULL,
    cc_type VARCHAR(
        255
) NULL,
    response text NULL,
    initiate_date timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_cc_transaction PRIMARY KEY (
        id
)
);
-- Table: coupon 
CREATE TABLE ivideo.coupon 
  ( 
     id          serial NOT NULL, 
     code        varchar(255) NOT NULL, 
     description text NULL, 
     active      bool NULL DEFAULT true, 
     value       numeric NULL, 
     multiple    bool NULL DEFAULT false, 
     start_date  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NULL, 
     end_date    timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NULL, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_coupons PRIMARY KEY ( id ) 
  ); 

-- Table: product 
CREATE TABLE ivideo.product 
  ( 
     id                               serial NOT NULL, 
     subscription_id                  integer NULL, 
     video_series_id                  int, 
     sku                              varchar(255), 
     NAME                             varchar(255), 
     description                      text NULL, 
     subscription_price               numeric, 
     subscurption_period_months       integer, 
     subscription_period_interval     integer NULL, 
     subscription_length              numeric NULL, 
     subscription_trial_period        varchar(50) NULL, 
     subscription_trial_length_months numeric NULL, 
     is_autorenew                     boolean, 
     is_active                        boolean, 
     subtotal                         numeric, 
     inserted_at                      timestamp WITH time zone DEFAULT 
     CURRENT_TIMESTAMP NOT NULL, 
     updated_at                       timestamp WITH time zone DEFAULT 
     CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_subscription_product PRIMARY KEY ( id ) 
  ); 

-- Table: product_category 
CREATE TABLE ivideo.product_category 
  ( 
     category_id integer, 
     product_id  integer, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_product_category PRIMARY KEY ( category_id, product_id ) 
  ); 

-- Table: product_statuses 
CREATE TABLE ivideo.product_statuses 
  ( 
     id          serial NOT NULL, 
     NAME        varchar(255), 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_product_statuses PRIMARY KEY ( id ) 
  ); 

-- Table: product_tag 
CREATE TABLE ivideo.product_tag 
  ( 
     product_id  integer, 
     tag_id      integer, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_product_tag PRIMARY KEY ( product_id, tag_id ) 
  ); 

-- Table: role 
CREATE TABLE ivideo.role 
  ( 
     id          serial NOT NULL, 
     NAME        varchar(255), 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_roles PRIMARY KEY ( id ) 
  ); 

-- Table: series_video 
CREATE TABLE ivideo.series_video 
  ( 
     product_id  int, 
     video_id    int, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT series_video_pk PRIMARY KEY ( product_id, video_id ) 
  ); 

-- Table: session 
CREATE TABLE ivideo.session 
  ( 
     id          varchar(255) NOT NULL, 
     data        text NULL, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_sessions PRIMARY KEY ( id ) 
  ); 

-- Table: subscription_order 
CREATE TABLE ivideo.subscription_order 
  ( 
     id                serial NOT NULL, 
     subscription_date date, 
     total             numeric, 
     coupon_id         integer NULL, 
     session_id        varchar(255), 
     user_id           integer, 
     inserted_at       timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT 
     NULL, 
     updated_at        timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT 
     NULL, 
     CONSTRAINT pk_subscription_order PRIMARY KEY ( id ) 
  ); 

-- Table: tag 
CREATE TABLE ivideo.tag 
  ( 
     id          serial NOT NULL, 
     NAME        varchar(255), 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_tag PRIMARY KEY ( id ) 
  ); 

-- Table: user 
CREATE TABLE ivideo. "user" 
  ( 
     id          serial NOT NULL, 
     email       varchar(255), 
     first_name  varchar(255), 
     last_name   varchar(255), 
     active      bool NULL DEFAULT true, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_user PRIMARY KEY ( id ) 
  ); 

-- Table: user_role 
CREATE TABLE ivideo.user_role 
  ( 
     user_id     integer, 
     role_id     integer, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_user_role PRIMARY KEY ( user_id, role_id ) 
  ); 

-- Table: video 
CREATE TABLE ivideo.video 
  ( 
     id                      serial NOT NULL, 
     video_title             varchar(255), 
     size                    float NULL, 
     user_id                 integer NULL, 
     description             text NULL, 
     category_id             integer NULL, 
     number_of_likes         integer NULL, 
     number_of_dislikes      integer NULL, 
     number_of_displayed     integer NULL, 
     uploaded_date           timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP 
     NULL, 
     series_video_product_id int NOT NULL, 
     series_video_video_id   int NOT NULL, 
     CONSTRAINT pk_video PRIMARY KEY ( id ) 
  ); 

-- Table: video_series_product 
CREATE TABLE ivideo.video_series_product 
  ( 
     id                      serial NOT NULL, 
     video_id                int, 
     sku                     varchar(255), 
     NAME                    varchar(255), 
     description             text, 
     product_status_id       integer, 
     regular_price           numeric DEFAULT 0, 
     discount_price          numeric DEFAULT 0, 
     quantity                integer DEFAULT 0, 
     taxable                 bool DEFAULT false, 
     inserted_at             timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP 
     NOT NULL, 
     updated_at              timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP 
     NOT NULL, 
     subscription_product_id int, 
     series_video_product_id int, 
     series_video_video_id   int, 
     CONSTRAINT pk_product PRIMARY KEY ( id ) 
  ); 
      CREATE TABLE ivideo.user_login(
		id          serial NOT NULL, 
    user_id integer,
    username varchar(255), 
    password varchar(255),
    CONSTRAINT pk_user_login PRIMARY KEY ( id ) 
  ) 

  CREATE TABLE ivideo.cart (
    id serial  NOT NULL,
    user_id int UNIQUE NOT NULL,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    checked_out timestamp WITH time zone,
    CONSTRAINT cart_pk PRIMARY KEY (id)
);

-- Table: cart_items
CREATE TABLE ivideo.cart_items (
    id serial  NOT NULL,
    cart_id int  NOT NULL,
    product_id int  NOT NULL,
    cart_prod_key int UNIQUE NOT NULL,
    quantity int,
    price numeric DEFAULT 0,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT cart_items_pk PRIMARY KEY (id)
);



-- foreign keys
-- Reference: fk_category_parent_category (table: category)
-- End of file.
-- End of file.
