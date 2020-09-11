export class BatchDependency{
    dependency_sid;
    batch_sid;
    depends_on_batch_sid;
    task_sid?;
    depends_on_task_sid?;
    dependency_type;
    dependency_level;
    dependency_status?;
    insert_date;
    insert_user;
    update_date?;
    update_user?;
}