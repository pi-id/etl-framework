export interface Task {
    task_sid : number; 
    batch_sid? : number; 
    task_type : string; 
    task_id? : string; 
    dependent_task_sid? : number; 
    task_name : string; 
    task_desc? : string; 
    task_status? : string; 
    dq_check_type_sid? : number; 
    ssis_package_quid? : string; 
    ssis_package_name? : string; 
    ssis_package_version? : string; 
    ssis_package_path? : string; 
    ssis_package_file_name? : string; 
    server_name? : string;
    source_database_name? : string; 
    destination_database_name? : string; 
    include_in_report? : boolean; 
    external_end_task? : boolean; 
    insert_date? : Date; 
    insert_user? : string; 
    update_date? : Date;
    update_user? : string; 
    task_order? : number;
    batch_name? : string;   
}
