 
 -- skripta je modificirana tako da su
 -- promijenjena imena tablicama i scheme kojima pripadaju
 CREATE TABLE [dbo].[domain_directory]( 

       [domain_directory_sid] [int] IDENTITY(1,1) NOT NULL,

       [datasource_sid] [int] NULL,

       [domain_directory_id] [nvarchar](30) NOT NULL,

       [domain_directory_name] [nvarchar](255) NOT NULL,

       [domain_directory_desc] [nvarchar](4000) NULL,

       [domain_directory_type] [nvarchar](30) NULL,

       [domain_directory_status] [nvarchar](30) NOT NULL,

       [insert_date] [datetime] NOT NULL,

       [insert_user] [nvarchar](255) NOT NULL,

       [update_date] [datetime] NULL,

       [update_user] [nvarchar](255) NULL,

CONSTRAINT [pk_domain_directory] PRIMARY KEY CLUSTERED

(

       [domain_directory_sid] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

 

GO

/****** Object:  Table [dbo].[domain_value]    Script Date: 2.9.2020. 18:15:56 ******/

SET ANSI_NULLS ON

GO

SET QUOTED_IDENTIFIER ON

GO

CREATE TABLE [dbo].[domain_value](

       [domain_value_sid] [int] IDENTITY(1,1) NOT NULL,

       [domain_directory_sid] [int] NULL,

       [domain_value_value] [nvarchar](30) NOT NULL,

       [domain_value_desc] [nvarchar](2000) NULL,

       [domain_value_data_type] [nvarchar](30) NULL,

       [domain_value_status] [nvarchar](30) NOT NULL,

       [insert_date] [datetime] NOT NULL,

       [insert_user] [nvarchar](255) NOT NULL,

       [update_date] [datetime] NULL,

       [update_user] [nvarchar](255) NULL,

CONSTRAINT [PK_domain_value] PRIMARY KEY CLUSTERED

(

       [domain_value_sid] ASC

)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

) ON [PRIMARY]

 

GO

ALTER TABLE [dbo].[domain_directory] ADD  CONSTRAINT [df_domain_directory_insert_date]  DEFAULT (getdate()) FOR [insert_date]

GO

ALTER TABLE [dbo].[domain_directory] ADD  CONSTRAINT [df_domain_directory_insert_user]  DEFAULT (suser_sname()) FOR [insert_user]

GO

ALTER TABLE [dbo].[domain_value] ADD  CONSTRAINT [DF_domain_value_insert_date]  DEFAULT (getdate()) FOR [insert_date]

GO

ALTER TABLE [dbo].[domain_value] ADD  CONSTRAINT [DF_domain_value_insert_user]  DEFAULT (suser_sname()) FOR [insert_user]

GO

ALTER TABLE [dbo].[domain_directory]  WITH CHECK ADD  CONSTRAINT [fk_domain_directory_datasource] FOREIGN KEY([datasource_sid])

REFERENCES dbo.[meta_datasource] ([datasource_sid])

GO

ALTER TABLE [dbo].[domain_directory] CHECK CONSTRAINT [fk_domain_directory_datasource]

GO

ALTER TABLE [dbo].[domain_value]  WITH CHECK ADD  CONSTRAINT [fk_domain_value_domain_directory] FOREIGN KEY([domain_directory_sid])

REFERENCES [dbo].[domain_directory] ([domain_directory_sid])

GO

ALTER TABLE [dbo].[domain_value] CHECK CONSTRAINT [fk_domain_value_domain_directory]

GO
------------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('batch_status_id', 'batch_status', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');

------------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('task_status_id', 'task_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');

------------------------------------------------------------


insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('datasource_status_id', 'datasource_Status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');

------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('object_status_id', 'object_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');

------------------------------------------------------------


insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('task_status_id', 'task_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');
------------------------------------------------------------


insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('object_task_status_id', 'object_task_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');

------------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('task_status_id', 'task_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');
------------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('batch_log_status_id', 'batch_log_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'PENDING', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ERROR', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'SUCCESS', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'RUNNING', 'ACTIVE');

-------------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('task_log_status_id', 'task_log_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ERROR', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'SUCCESS', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'RUNNING', 'ACTIVE');

----------------------------------------------------------

insert into dbo.domain_directory (domain_directory_id, domain_directory_name, domain_directory_status)
values ('dependency_status_id', 'dependency_status', 'ACTIVE');

insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'ACTIVE', 'ACTIVE');
insert into dbo.domain_value (domain_directory_sid, domain_value_value, domain_value_status)
values ((select max(domain_directory_sid) from dbo.domain_directory), 'INACTIVE', 'ACTIVE');
