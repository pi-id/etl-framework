
-- mijenjanje imena tablica iz meta scheme
USE ADM_Configuration;   
GO  
EXEC sp_rename 'attribute', 'meta_attribute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'auto_load', 'meta_auto_load';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch', 'meta_batch';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch_institute', 'meta_batch_institute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch_log', 'meta_batch_log';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'configuration', 'meta_configuration';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'datasource', 'meta_datasource';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'dependency', 'meta_dependency';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'dependency_task', 'meta_dependency_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'domain_values', 'meta_domain_values';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'error_log', 'meta_error_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object', 'meta_object';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object_task', 'meta_object_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object_type', 'meta_object_type';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'population', 'meta_population';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task', 'meta_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task_log', 'meta_task_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task_log_detail', 'meta_task_log_detail';USE ADM_Configuration;   
GO  
EXEC sp_rename 'attribute', 'meta_attribute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'auto_load', 'meta_auto_load';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch', 'meta_batch';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch_institute', 'meta_batch_institute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'batch_log', 'meta_batch_log';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'configuration', 'meta_configuration';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'datasource', 'meta_datasource';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'dependency', 'meta_dependency';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'dependency_task', 'meta_dependency_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'domain_values', 'meta_domain_values';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'error_log', 'meta_error_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object', 'meta_object';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object_task', 'meta_object_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'object_type', 'meta_object_type';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'population', 'meta_population';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task', 'meta_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task_log', 'meta_task_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'task_log_detail', 'meta_task_log_detail';

ALTER SCHEMA dbo transfer meta.meta_attribute;
ALTER SCHEMA dbo transfer meta.meta_auto_load;
ALTER SCHEMA dbo transfer meta.meta_batch;
ALTER SCHEMA dbo transfer meta.meta_batch_institute;
ALTER SCHEMA dbo transfer meta.meta_batch_log;
ALTER SCHEMA dbo transfer meta.meta_configuration;
ALTER SCHEMA dbo transfer meta.meta_datasource;
ALTER SCHEMA dbo transfer meta.meta_dependency;
ALTER SCHEMA dbo transfer meta.meta_dependency_task;
ALTER SCHEMA dbo transfer meta.meta_domain_values;
ALTER SCHEMA dbo transfer meta.meta_error_log;
ALTER SCHEMA dbo transfer meta.meta_object;
ALTER SCHEMA dbo transfer meta.meta_object_task;
ALTER SCHEMA dbo transfer meta.meta_object_type;
ALTER SCHEMA dbo transfer meta.meta_population;
ALTER SCHEMA dbo transfer meta.meta_task;
ALTER SCHEMA dbo transfer meta.meta_task_log;
ALTER SCHEMA dbo transfer meta.meta_task_log_detail;