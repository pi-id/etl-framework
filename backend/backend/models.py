# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class SmGroups(models.Model):
    sm_group_id = models.AutoField(db_column='SM_GROUP_ID', primary_key=True)  # Field name made lowercase.
    group_name = models.CharField(db_column='GROUP_NAME', max_length=50, blank=True, null=True)  # Field name made lowercase.
    email_address = models.CharField(db_column='EMAIL_ADDRESS', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SM_GROUPS'


class SmType(models.Model):
    sm_type_id = models.AutoField(db_column='SM_TYPE_ID', primary_key=True)  # Field name made lowercase.
    mail_type = models.CharField(db_column='MAIL_TYPE', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SM_TYPE'


class SmTypeXGroups(models.Model):
    sm_txg_id = models.AutoField(db_column='SM_TXG_ID', primary_key=True)  # Field name made lowercase.
    sm_type = models.ForeignKey(SmType, models.DO_NOTHING, db_column='SM_TYPE_ID', blank=True, null=True)  # Field name made lowercase.
    sm_group = models.ForeignKey(SmGroups, models.DO_NOTHING, db_column='SM_GROUP_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SM_TYPE_X_GROUPS'


class SmUsers(models.Model):
    sm_user_id = models.AutoField(db_column='SM_USER_ID', primary_key=True)  # Field name made lowercase.
    email_address = models.CharField(db_column='EMAIL_ADDRESS', max_length=50, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=50, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SM_USERS'


class SmUsersXGroups(models.Model):
    sm_uxg_id = models.AutoField(db_column='SM_UXG_ID', primary_key=True)  # Field name made lowercase.
    sm_group = models.ForeignKey(SmGroups, models.DO_NOTHING, db_column='SM_GROUP_ID', blank=True, null=True)  # Field name made lowercase.
    sm_user = models.ForeignKey(SmUsers, models.DO_NOTHING, db_column='SM_USER_ID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SM_USERS_X_GROUPS'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=80)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Batch(models.Model):
    batch_sid = models.IntegerField(primary_key=True)
    batch_id = models.IntegerField(unique=True)
    batch_name = models.CharField(max_length=200)
    batch_desc = models.CharField(max_length=200)
    batch_type = models.CharField(max_length=200)
    batch_status = models.CharField(max_length=200)
    server_name = models.CharField(max_length=200, blank=True, null=True)
    source_database_name = models.CharField(max_length=500)
    destination_database_name = models.CharField(max_length=500)
    ssis_package_name = models.CharField(max_length=500)
    job_name = models.CharField(max_length=200, blank=True, null=True)
    job_step_name = models.CharField(max_length=200, blank=True, null=True)
    dashboard_type = models.CharField(max_length=200)
    use_mail_status = models.BooleanField(blank=True, null=True)
    insert_date = models.DateField()
    insert_user = models.CharField(max_length=200)
    update_date = models.DateField(blank=True, null=True)
    update_user = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'batch'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class MetaAttribute(models.Model): # meta attribute i domain value imaju autofield bez primary_key=True
    attribute_id = models.AutoField(primary_key=True)
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid')
    column_name = models.CharField(max_length=255, blank=True, null=True)
    pk_flag = models.BooleanField()
    dv_f = models.BooleanField(db_column='DV_f', blank=True, null=True)  # Field name made lowercase.
    dv_sid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_attribute'


class MetaAutoLoad(models.Model):
    auto_load_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey('MetaBatch', models.DO_NOTHING, db_column='batch_sid', blank=True, null=True)
    source_batch_log_sid = models.ForeignKey('MetaBatchLog', models.DO_NOTHING, db_column='source_batch_log_sid', blank=True, null=True,
    related_name = 'autoload_source')
    target_batch_log_sid = models.ForeignKey('MetaBatchLog', models.DO_NOTHING, db_column='target_batch_log_sid', blank=True, null=True,
    related_name = 'autoload_target')
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid', blank=True, null=True)
    source_object_sid = models.ForeignKey('MetaObject', models.DO_NOTHING, db_column='source_object_sid', blank=True, null=True,
    related_name = 'autoload_source')
    target_object_sid = models.ForeignKey('MetaObject', models.DO_NOTHING, db_column='target_object_sid', blank=True, null=True,
    related_name = 'autoload_target')
    source_task_log_sid = models.ForeignKey('MetaTaskLog', models.DO_NOTHING, db_column='source_task_log_sid', blank=True, null=True,
    related_name = 'autoload_source')
    target_task_log_sid = models.ForeignKey('MetaTaskLog', models.DO_NOTHING, db_column='target_task_log_sid', blank=True, null=True,
    related_name = 'autoload_target')
    automated_load_status = models.CharField(max_length=30, blank=True, null=True)
    population_sid = models.IntegerField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_auto_load'


class MetaBatch(models.Model):
    batch_sid = models.AutoField(primary_key=True)
    datasource_sid = models.ForeignKey('MetaDatasource', models.DO_NOTHING, db_column='datasource_sid', blank=True, null=True)
    batch_id = models.CharField(max_length=255, blank=True, null=True)
    batch_name = models.CharField(max_length=255)
    batch_desc = models.CharField(max_length=2000, blank=True, null=True)
    batch_type = models.CharField(max_length=255)
    batch_status = models.CharField(max_length=30)
    server_name = models.CharField(max_length=255, blank=True, null=True)
    source_database_name = models.CharField(max_length=255, blank=True, null=True)
    destination_database_name = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_name = models.CharField(max_length=255, blank=True, null=True)
    job_name = models.CharField(max_length=255, blank=True, null=True)
    job_step_name = models.CharField(max_length=255, blank=True, null=True)
    job_scheduled = models.BooleanField(blank=True, null=True)
    dashboard_type = models.CharField(max_length=30, blank=True, null=True)
    use_mail_status = models.BooleanField()
    insert_date = models.DateTimeField(blank=True, null=True)
    insert_user = models.CharField(max_length=255, blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_batch'


class MetaBatchInstitute(models.Model):
    batch_sid = models.BigIntegerField(blank=True, null=True)
    institute_id = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_batch_institute'


class MetaBatchLog(models.Model):
    batch_log_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='batch_sid', blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    batch_log_status = models.CharField(max_length=30, blank=True, null=True)
    batch_duration = models.IntegerField(blank=True, null=True)
    run_count = models.IntegerField(blank=True, null=True)
    last_batch = models.BooleanField()
    ssis_execution_id = models.BigIntegerField(blank=True, null=True)
    sql_agent_start_date = models.DateTimeField(blank=True, null=True)
    sql_agent_instance_id = models.IntegerField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)
    population_sid = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_batch_log'


class MetaConfiguration(models.Model):
    force_rerun = models.BooleanField()
    start_batch = models.IntegerField()
    maximumparallelism = models.IntegerField(db_column='MaximumParallelism', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'meta_configuration'


class MetaDatasource(models.Model):
    datasource_sid = models.AutoField(primary_key=True)
    related_datasource_sid = models.ForeignKey('self', models.DO_NOTHING, db_column='related_datasource_sid', blank=True, null=True)
    source_system_id = models.CharField(max_length=30, blank=True, null=True)
    datasource_id = models.CharField(max_length=255, blank=True, null=True)
    datasource_name = models.CharField(max_length=255, blank=True, null=True)
    datasource_version = models.CharField(max_length=255, blank=True, null=True)
    datasource_provider = models.CharField(max_length=255, blank=True, null=True)
    datasource_status = models.CharField(max_length=30)
    datasource_description = models.CharField(max_length=2000, blank=True, null=True)
    datasource_type = models.CharField(max_length=30, blank=True, null=True)
    rdbms_name = models.CharField(max_length=255, blank=True, null=True)
    rdbms_version = models.CharField(max_length=255, blank=True, null=True)
    server_name = models.CharField(max_length=255, blank=True, null=True)
    server_ip_address = models.CharField(max_length=30, blank=True, null=True)
    server_port = models.CharField(max_length=30, blank=True, null=True)
    db_name = models.CharField(max_length=255, blank=True, null=True)
    db_port = models.CharField(max_length=255, blank=True, null=True)
    user_name = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    connection_string = models.CharField(max_length=255, blank=True, null=True)
    mail = models.CharField(max_length=2000, blank=True, null=True)
    decimal_separator = models.CharField(max_length=30, blank=True, null=True)
    thousands_separator = models.CharField(max_length=30, blank=True, null=True)
    date_mask = models.CharField(max_length=30, blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_datasource'


class MetaDependency(models.Model):
    dependency_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='batch_sid',
    related_name = 'dependency')
    depends_on_batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='depends_on_batch_sid',
    related_name = 'dependeddependency')
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid', blank=True, null=True,
    related_name = 'dependency')
    depends_on_task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='depends_on_task_sid', blank=True, null=True,
    related_name = 'dependeddependency')
    dependency_type = models.CharField(max_length=30)
    dependency_level = models.CharField(max_length=30)
    dependency_status = models.CharField(max_length=30, blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_dependency'


class MetaDependencyTask(models.Model):
    task_dependency_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='batch_sid', blank=True, null=True,
    related_name = 'dependencytask')
    depends_on_batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='depends_on_batch_sid', blank=True, null=True,
    related_name = 'dependeddependencytask')
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid',
    related_name = 'dependency_task')
    depends_on_task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='depends_on_task_sid', blank=True, null=True,
    related_name = 'dependeddependencytask')
    dependency_type = models.CharField(max_length=30)
    dependency_level = models.CharField(max_length=30)
    dependency_status = models.CharField(max_length=30, blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_dependency_task'


class MetaDomainValues(models.Model):
    dva_sid = models.AutoField(primary_key=True)
    dva_value = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'meta_domain_values'


class MetaErrorLog(models.Model):
    error_log_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='batch_sid', blank=True, null=True)
    batch_log_sid = models.ForeignKey(MetaBatchLog, models.DO_NOTHING, db_column='batch_log_sid', blank=True, null=True)
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid', blank=True, null=True)
    task_log_sid = models.ForeignKey('MetaTaskLog', models.DO_NOTHING, db_column='task_log_sid', blank=True, null=True)
    machine_name = models.CharField(max_length=256, blank=True, null=True)
    ssis_package_id = models.CharField(max_length=256, blank=True, null=True)
    ssis_package_name = models.CharField(max_length=256, blank=True, null=True)
    ssis_task_id = models.CharField(max_length=256, blank=True, null=True)
    ssis_task_name = models.CharField(max_length=256, blank=True, null=True)
    ssis_task_description = models.CharField(max_length=1000, blank=True, null=True)
    ssis_task_start_time = models.DateTimeField(blank=True, null=True)
    ssis_info = models.CharField(max_length=2000, blank=True, null=True)
    sql_statement = models.TextField(blank=True, null=True)
    error_code = models.IntegerField(blank=True, null=True)
    error_desc = models.CharField(max_length=4000, blank=True, null=True)
    ssis_execution_id = models.BigIntegerField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_error_log'


class MetaObject(models.Model):
    object_sid = models.AutoField(primary_key=True)
    datasource_sid = models.ForeignKey(MetaDatasource, models.DO_NOTHING, db_column='datasource_sid', blank=True, null=True)
    object_type_sid = models.ForeignKey('MetaObjectType', models.DO_NOTHING, db_column='object_type_sid')
    object_id = models.CharField(max_length=255, blank=True, null=True)
    object_schema = models.CharField(max_length=255)
    object_name = models.CharField(max_length=255)
    object_description = models.CharField(max_length=2000, blank=True, null=True)
    object_status = models.CharField(max_length=30)
    source_select = models.TextField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_object'


class MetaObjectTask(models.Model):
    object_task_sid = models.AutoField(primary_key=True)
    source_object_sid = models.ForeignKey(MetaObject, models.DO_NOTHING, db_column='source_object_sid',
    related_name = 'sourceobjecttask')
    target_object_sid = models.ForeignKey(MetaObject, models.DO_NOTHING, db_column='target_object_sid',
    related_name = 'targetobjecttask')
    task_sid = models.ForeignKey('MetaTask', models.DO_NOTHING, db_column='task_sid', blank=True, null=True)
    object_task_status = models.CharField(max_length=30)
    incremental_load = models.BooleanField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_object_task'


class MetaObjectType(models.Model):
    object_type_sid = models.IntegerField(primary_key=True)
    object_type_id = models.CharField(max_length=30, blank=True, null=True)
    object_type_name = models.CharField(max_length=255, blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_object_type'


class MetaPopulation(models.Model):
    population_sid = models.AutoField(primary_key=True)
    population_dt = models.DateTimeField()
    act_f = models.BooleanField()
    run_count = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_population'


class MetaTask(models.Model):
    task_sid = models.AutoField(primary_key=True)
    batch_sid = models.ForeignKey(MetaBatch, models.DO_NOTHING, db_column='batch_sid', blank=True, null=True)
    task_type = models.CharField(max_length=30)
    task_id = models.CharField(max_length=255, blank=True, null=True)
    dependent_task_sid = models.IntegerField(blank=True, null=True)
    task_name = models.CharField(max_length=255)
    task_desc = models.CharField(max_length=2000, blank=True, null=True)
    task_status = models.CharField(max_length=50, blank=True, null=True)
    dq_check_type_sid = models.IntegerField(blank=True, null=True)
    ssis_package_guid = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_name = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_version = models.CharField(max_length=30, blank=True, null=True)
    ssis_package_path = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_file_name = models.CharField(max_length=255, blank=True, null=True)
    server_name = models.CharField(max_length=255, blank=True, null=True)
    source_database_name = models.CharField(max_length=255, blank=True, null=True)
    destination_database_name = models.CharField(max_length=255, blank=True, null=True)
    include_in_report = models.BooleanField(blank=True, null=True)
    external_end_task = models.BooleanField(blank=True, null=True)
    insert_date = models.DateTimeField(blank=True, null=True)
    insert_user = models.CharField(max_length=255, blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)
    task_order = models.IntegerField(db_column='TASK_ORDER', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'meta_task'


class MetaTaskLog(models.Model):
    task_log_sid = models.AutoField(primary_key=True)
    batch_log_sid = models.ForeignKey(MetaBatchLog, models.DO_NOTHING, db_column='batch_log_sid')
    task_sid = models.ForeignKey(MetaTask, models.DO_NOTHING, db_column='task_sid')
    task_log_status = models.CharField(max_length=50, blank=True, null=True)
    task_log_duration = models.IntegerField(blank=True, null=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    run_count = models.IntegerField(blank=True, null=True)
    ssis_execution_id = models.CharField(max_length=255, blank=True, null=True)
    source_object_sid = models.ForeignKey(MetaObject, models.DO_NOTHING, db_column='source_object_sid', blank=True, null=True,
    related_name = 'sourcetasklog')
    target_object_sid = models.ForeignKey(MetaObject, models.DO_NOTHING, db_column='target_object_sid', blank=True, null=True,
    related_name = 'targettasklog')
    inc_load_date_from = models.DateTimeField(blank=True, null=True)
    inc_load_date_to = models.DateTimeField(blank=True, null=True)
    inc_load_int_from = models.IntegerField(blank=True, null=True)
    inc_load_int_to = models.IntegerField(blank=True, null=True)
    insert_date = models.DateTimeField(blank=True, null=True)
    insert_user = models.CharField(max_length=255, blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_task_log'


class MetaTaskLogDetail(models.Model):
    task_log_detail_sid = models.AutoField(primary_key=True)
    task_log_sid = models.ForeignKey(MetaTaskLog, models.DO_NOTHING, db_column='task_log_sid', blank=True, null=True)
    object_sid = models.ForeignKey(MetaObject, models.DO_NOTHING, db_column='object_sid', blank=True, null=True)
    machine_name = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_name = models.CharField(max_length=255, blank=True, null=True)
    ssis_package_start_time = models.DateTimeField(blank=True, null=True)
    ssis_package_duration = models.IntegerField(blank=True, null=True)
    ssis_task_name = models.CharField(max_length=255, blank=True, null=True)
    ssis_task_id = models.CharField(max_length=255, blank=True, null=True)
    ssis_task_duration = models.IntegerField(blank=True, null=True)
    ssis_sql = models.TextField(blank=True, null=True)
    ssis_info = models.CharField(max_length=2000, blank=True, null=True)
    rows_selected = models.IntegerField(blank=True, null=True)
    rows_updated = models.IntegerField(blank=True, null=True)
    rows_inserted = models.IntegerField(blank=True, null=True)
    rows_deleted = models.IntegerField(blank=True, null=True)
    insert_date = models.DateTimeField()
    insert_user = models.CharField(max_length=255)
    update_date = models.DateTimeField(blank=True, null=True)
    update_user = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'meta_task_log_detail'


class Proba(models.Model):
    task_sid = models.IntegerField(blank=True, null=True)
    task_id = models.CharField(max_length=255, blank=True, null=True)
    task_status = models.CharField(max_length=255, blank=True, null=True)
    task_order = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'proba'
