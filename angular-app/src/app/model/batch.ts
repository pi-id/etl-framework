export interface Batch {
    batch_sid : number; 
    datasource_sid? : number; 
    batch_id? : string; 
    batch_name? : string; 
    batch_desc? : string; 
    batch_type? : string; 
    batch_status? : string; 
    server_name? : string; 
    source_database_name? : string; 
    destination_database_name? : string; 
    ssis_package_name? : string; 
    job_name? : string; 
    job_step_name? : string; 
    job_scheduled? : boolean;
    dashboard_type? : string; 
    use_mail_status? : boolean; 
    insert_date? : Date; 
    insert_user? : string; 
    update_date? : Date; 
    update_user? : string; 
    datasource_name? : string; 
}
