
-- mijenjanje imena tablica iz meta scheme
USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.attribute', 'meta_attribute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.auto_load', 'meta_auto_load';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch', 'meta_batch';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch_institute', 'meta_batch_institute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch_log', 'meta_batch_log';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.configuration', 'meta_configuration';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.datasource', 'meta_datasource';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.dependency', 'meta_dependency';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.dependency_task', 'meta_dependency_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.domain_values', 'meta_domain_values';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.error_log', 'meta_error_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object', 'meta_object';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object_task', 'meta_object_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object_type', 'meta_object_type';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.population', 'meta_population';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task', 'meta_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task_log', 'meta_task_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task_log_detail', 'meta_task_log_detail';USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.attribute', 'meta_attribute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.auto_load', 'meta_auto_load';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch', 'meta_batch';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch_institute', 'meta_batch_institute';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.batch_log', 'meta_batch_log';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.configuration', 'meta_configuration';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.datasource', 'meta_datasource';  

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.dependency', 'meta_dependency';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.dependency_task', 'meta_dependency_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.domain_values', 'meta_domain_values';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.error_log', 'meta_error_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object', 'meta_object';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object_task', 'meta_object_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.object_type', 'meta_object_type';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.population', 'meta_population';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task', 'meta_task';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task_log', 'meta_task_log';

USE ADM_Configuration;   
GO  
EXEC sp_rename 'meta.task_log_detail', 'meta_task_log_detail';

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