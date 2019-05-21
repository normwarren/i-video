-- DROP TABLE IF EXISTS ivideo.role;
-- DROP TABLE IF EXISTS ivideo."user";
-- DROP TABLE IF EXISTS ivideo.user_role;
-- DROP TABLE IF EXISTS ivideo.user_login;

CREATE TABLE ivideo.role 
  ( 
     id          serial NOT NULL, 
     NAME        varchar(255), 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_roles PRIMARY KEY ( id ) 
  );
  CREATE TABLE ivideo."user" 
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
  CREATE TABLE ivideo.user_role 
  ( 
     user_id     integer, 
     role_id     integer, 
     inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     updated_at  timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL, 
     CONSTRAINT pk_user_role PRIMARY KEY ( user_id, role_id ) 
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
    checked_out timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT cart_pk PRIMARY KEY (id)
);

-- Table: cart_items
CREATE TABLE ivideo.cart_items (
    id serial  NOT NULL,
    cart_id int  NOT NULL,
    product_id int  NOT NULL,
    quantity int,
    price numeric,
    inserted_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp WITH time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT cart_items_pk PRIMARY KEY (id)
);