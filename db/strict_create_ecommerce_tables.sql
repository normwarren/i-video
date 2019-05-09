-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-05-07 22:49:28.412

-- tables
-- Table: category
CREATE TABLE category (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    parent_id integer  NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_category PRIMARY KEY (id)
);

-- Table: cc_transaction
CREATE TABLE cc_transaction (
    id serial  NOT NULL,
    code varchar(255)  NULL,
    subscription_id integer  NOT NULL,
    transdate timestamp  NULL,
    processor varchar(255)  NOT NULL,
    processor_trans_id varchar(255)  NOT NULL,
    amount numeric  NOT NULL,
    cc_num varchar(255)  NULL,
    cc_type varchar(255)  NULL,
    response text  NULL,
    initiate_date timestamp  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_cc_transaction PRIMARY KEY (id)
);

-- Table: coupon
CREATE TABLE coupon (
    id serial  NOT NULL,
    code varchar(255)  NOT NULL,
    description text  NULL,
    active bool  NULL DEFAULT true,
    value numeric  NULL,
    multiple bool  NULL DEFAULT false,
    start_date timestamp  NULL,
    end_date timestamp  NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_coupons PRIMARY KEY (id)
);

-- Table: product
CREATE TABLE product (
    id serial  NOT NULL,
    subscription_id integer  NULL,
    video_series_id int  NOT NULL,
    sku varchar(255)  NOT NULL,
    name varchar(255)  NOT NULL,
    description text  NULL,
    subscription_price numeric  NOT NULL,
    subscurption_period_months integer  NOT NULL,
    subscription_period_interval integer  NULL,
    subscription_length numeric  NULL,
    subscription_trial_period varchar(50)  NULL,
    subscription_trial_length_months numeric  NULL,
    is_autorenew boolean  NOT NULL,
    is_active boolean  NOT NULL,
    subtotal numeric  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_subscription_product PRIMARY KEY (id)
);

-- Table: product_category
CREATE TABLE product_category (
    category_id integer  NOT NULL,
    product_id integer  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_product_category PRIMARY KEY (category_id,product_id)
);

-- Table: product_statuses
CREATE TABLE product_statuses (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_product_statuses PRIMARY KEY (id)
);

-- Table: product_tag
CREATE TABLE product_tag (
    product_id integer  NOT NULL,
    tag_id integer  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_product_tag PRIMARY KEY (product_id,tag_id)
);

-- Table: role
CREATE TABLE role (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

-- Table: series_video
CREATE TABLE series_video (
    product_id int  NOT NULL,
    video_id int  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT series_video_pk PRIMARY KEY (product_id,video_id)
);

-- Table: session
CREATE TABLE session (
    id varchar(255)  NOT NULL,
    data text  NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_sessions PRIMARY KEY (id)
);

-- Table: subscription_order
CREATE TABLE subscription_order (
    id serial  NOT NULL,
    subscription_date date  NOT NULL,
    total numeric  NOT NULL,
    coupon_id integer  NULL,
    session_id varchar(255)  NOT NULL,
    user_id integer  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_subscription_order PRIMARY KEY (id)
);

-- Table: tag
CREATE TABLE tag (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_tag PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id serial  NOT NULL,
    email varchar(255)  NOT NULL,
    first_name varchar(255)  NOT NULL,
    last_name varchar(255)  NOT NULL,
    active bool  NULL DEFAULT true,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

-- Table: user_role
CREATE TABLE user_role (
    user_id integer  NOT NULL,
    role_id integer  NOT NULL,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT pk_user_role PRIMARY KEY (user_id,role_id)
);

-- Table: video
CREATE TABLE video (
    id serial  NOT NULL,
    video_title varchar(255)  NOT NULL,
    size float  NULL,
    user_id integer  NULL,
    description text  NULL,
    category_id integer  NULL,
    number_of_likes integer  NULL,
    number_of_dislikes integer  NULL,
    number_of_displayed integer  NULL,
    uploaded_date timestamp  NULL,
    series_video_product_id int  NOT NULL,
    series_video_video_id int  NOT NULL,
    CONSTRAINT pk_video PRIMARY KEY (id)
);

-- Table: video_series_product
CREATE TABLE video_series_product (
    id serial  NOT NULL,
    video_id int  NOT NULL,
    sku varchar(255)  NOT NULL,
    name varchar(255)  NOT NULL,
    description text  NULL,
    product_status_id integer  NOT NULL,
    regular_price numeric  NULL DEFAULT 0,
    discount_price numeric  NULL DEFAULT 0,
    quantity integer  NULL DEFAULT 0,
    taxable bool  NULL DEFAULT false,
    inserted_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    subscription_product_id int  NOT NULL,
    series_video_product_id int  NOT NULL,
    series_video_video_id int  NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (id)
);

-- foreign keys
-- Reference: fk_category_parent_category (table: category)
ALTER TABLE category ADD CONSTRAINT fk_category_parent_category
    FOREIGN KEY (parent_id)
    REFERENCES category (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_category_product_category (table: product_category)
ALTER TABLE product_category ADD CONSTRAINT fk_category_product_category
    FOREIGN KEY (category_id)
    REFERENCES category (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_coupon_subscription (table: subscription_order)
ALTER TABLE subscription_order ADD CONSTRAINT fk_coupon_subscription
    FOREIGN KEY (coupon_id)
    REFERENCES coupon (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_product_product_category (table: product_category)
ALTER TABLE product_category ADD CONSTRAINT fk_product_product_category
    FOREIGN KEY (product_id)
    REFERENCES video_series_product (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_product_product_tag (table: product_tag)
ALTER TABLE product_tag ADD CONSTRAINT fk_product_product_tag
    FOREIGN KEY (product_id)
    REFERENCES video_series_product (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_product_statuses_product (table: video_series_product)
ALTER TABLE video_series_product ADD CONSTRAINT fk_product_statuses_product
    FOREIGN KEY (product_status_id)
    REFERENCES product_statuses (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_role_user_role (table: user_role)
ALTER TABLE user_role ADD CONSTRAINT fk_role_user_role
    FOREIGN KEY (role_id)
    REFERENCES role (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_session_subscription_order (table: subscription_order)
ALTER TABLE subscription_order ADD CONSTRAINT fk_session_subscription_order
    FOREIGN KEY (session_id)
    REFERENCES session (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_subscription_order_cc_transaction (table: cc_transaction)
ALTER TABLE cc_transaction ADD CONSTRAINT fk_subscription_order_cc_transaction
    FOREIGN KEY (subscription_id)
    REFERENCES subscription_order (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_subscription_order_subscription_product (table: product)
ALTER TABLE product ADD CONSTRAINT fk_subscription_order_subscription_product
    FOREIGN KEY (subscription_id)
    REFERENCES subscription_order (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_tag_product_tag (table: product_tag)
ALTER TABLE product_tag ADD CONSTRAINT fk_tag_product_tag
    FOREIGN KEY (tag_id)
    REFERENCES tag (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_user_subscription_order (table: subscription_order)
ALTER TABLE subscription_order ADD CONSTRAINT fk_user_subscription_order
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_user_user_role (table: user_role)
ALTER TABLE user_role ADD CONSTRAINT fk_user_user_role
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: fk_user_video (table: video)
ALTER TABLE video ADD CONSTRAINT fk_user_video
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: video_series_product_series_video (table: video_series_product)
ALTER TABLE video_series_product ADD CONSTRAINT video_series_product_series_video
    FOREIGN KEY (series_video_product_id, series_video_video_id)
    REFERENCES series_video (product_id, video_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: video_series_product_subscription_product (table: video_series_product)
ALTER TABLE video_series_product ADD CONSTRAINT video_series_product_subscription_product
    FOREIGN KEY (subscription_product_id)
    REFERENCES product (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: video_series_video (table: video)
ALTER TABLE video ADD CONSTRAINT video_series_video
    FOREIGN KEY (series_video_product_id, series_video_video_id)
    REFERENCES series_video (product_id, video_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

