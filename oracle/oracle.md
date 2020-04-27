# oracle

资料参考: [初步了解oracle存储过程](http://www.xumenger.com/oracle-procedure-20160112/)

## oracle安装

前期准备: 1. oracle安装目录\dbhomeXE\network\admin\sqlnet.ora末尾加入 SQLNET.ALLOWED\_LOGON\_VERSION=8 2. D:\oracle\ed\dbhomeXE\network\admin\tnsnames.ora修改为\(SERVICE\_NAME = orcl\) 3. oracle的服务name为XE

## 数据库连接

* dos窗口:

  > sqlplus; sys as sysdba; 口令\(我的是1234\);

* 创建用户

  > create user c\#\#root identified by 1234;//创建 root 1234

* ora-01045解决:--没有create session权限，登录被拒绝

  > 解决:grant create session to c\#\#root;//grant dba to c\#\#root;--赋予管理员权限

## 视图

* 创建视图

  > CREATE \[OR REPLACE\] VIEW STU\_VIEW AS SELECT \* FROM STU;

* 删除视图

  > DROP VIEW VIEW\_NAME;

* 使用视图

  > SELECT \* FROM VIEW\_NAME;

* 赋予视图只读权限

  > CREATE VIEW STU\_READ AS SELECT \* FROM STU WITH READ ONLY;

## 增

* 单行数据增加

  > INSERT INTO STU VALUES\(1,'提莫'\);

* 多行数据增加

  > ```text
  > INSERT ALL
  > INTO STU VALUES(6,'提莫')
  > INTO STU VALUES(7,'提莫')
  > SELECT * FROM DUAL;
  > ```

## 删

* 删除id=1

  > DELETE FROM STU WHERE ID = 1;

## 改

* 修改id为2的name

  > UPDATE STU SET NAME = 'HHH' WHERE ID = 2;

## 查

* 查询所有

  > SELECT \* FROM STU;

* 查询分页\(前3条数据\)

  > SELECT  _FROM\(SELECT STU._,ROWNUM RN FROM\(SELECT \* FROM STU\) STU WHERE ROWNUM&lt;= 3\) WHERE RN &gt; 0;

* 左连接

  > SELECT \* FROM STU LEFT JOIN TEACHER ON TEACHER.STU\_ID = STU.ID;

* 右连接

  > SELECT \* FROM STU INNER JOIN TEACHER ON TEACHER.STU\_ID = STU.ID;

* having/group

  > SELECT S.NAME FROM STU S GROUP BY S.NAME HAVING NAME LIKE '%H%' ORDER BY NAME DESC;

* rownum关键字,查询前3条数据\(分页等差公式:an=a1+\(n-1\)d oracle的rownum只能做&lt;=判断 -- 因为rownum总是从1开始的，第一条不满足去掉的话，第二条的rownum 又成了1。依此类推，所以永远没有满足条件的记录。\)

  > SELECT ROWNUM,S.\* FROM STU S WHERE ROWNUM &lt;= 3;

* 分页公式\(PAGESIZE 每页条数;PAGENUM 页数\)

  > SELECT  _FROM \(SELECT ROWNUM R,_ FROM STU WHERE ROWNUM &lt;= \(PAGESIZE_PAGENUM\)\) WHERE R &gt; \(PAGESIZE_PAGENUM - PAGENUM\);

* 查询第5-7条数据

  > SELECT  _FROM \(SELECT ROWNUM R,S._ FROM STU S WHERE ROWNUM &lt;= 7\) T WHERE T.R &gt;= 5;

* 按工资降序排序,取第三页,每页5条数据\(排序的需要分三次\)

  > SELECT  _FROM \(SELECT ROWNUM R,E.NAME,E.SALARY FROM \(SELECT_  FROM EMP ORDER BY SALARY DESC\) E WHERE ROWNUM &lt;= 15\) T WHERE R &gt; 10;

* 查出工资小于7000的员工信息,按工资降序排序

  ```text
  select e.name,t.* from 
  (select id,sum(salary) s from emp group by id having sum(salary) < 7000 order by s desc) t
  inner join emp e 
  on t.id = e.id;
  ```

* 取平均工资小于5000的部门

  > select dept\_id,avg\(salary\) from emp group by dept\_id having avg\(salary\) &lt; 5000;

* 按部门分组,取平均值

  > select dept\_id,round\(avg\(salary\),2\) from emp group by dept\_id;

* 取每个部门最大与最小工资,按job排序

  > ```text
  > select job,max(sal),min(sal) from emp 
  > group by job 
  > order by job;
  > ```

## 索引

* 创建索引

  > CREATE INDEX STU\_INDEX\_ID ON STU\(ID\);

* 删除索引

  > DROP INDEX STU\_INDEX\_ID;

## 存储过程

* 创建存储过程

  ```text
  create or replace procedure emp_pro
  as
  begin
    dbms_output.put_line('hello world');
  end;
  ```

* 调用存储过程\(方式1\)

  > call emp\_pro\(\);

* dos命令调用存储过程\(方式2\)-只能在sqlplus中使用

  > SQL&gt; set serveroutput on;--需要开启才能显示 SQL&gt; exec sayHello;

* 存储过程调用\(方式3\)

  > begin emp\_pro; end;

* 存储过程记录数据总条数

  ```text
  create or replace procedure count_emp
  as
  e_count int;
  begin
    select count(*) into e_count from emp;
    dbms_output.put_line('总数:'||e_count);
  end count_emp;
  ```

* 使用存储过程存入数据

  ```text
  create or replace procedure insert_test(id in number,name in VARCHAR2,salary in NUMBER)
  AS
  begin 
  insert into emp values(id,name,salary);
  end insert_test;
  --- 调用存储过程
  call insert_test(16,'ss',6000.00);
  ```

* 使用存储过程存入数据\(方式2\)

  ```text
  DECLARE
    sno VARCHAR2(3);
    sname VARCHAR2(8);
    ssex VARCHAR2(2);
    sbirthday DATE;//不能限定日期长度
    class VARCHAR2(5);
  BEGIN
    sno:='a';
    sname:='s';
    ssex:='m';
    sbirthday:=to_date('2010-4-2','yyyy-MM-dd');
    class:='a';
    test01(sno,sname,ssex,sbirthday,class);
  end;
  ```

## 建表语句

* 创建学生表

  ```text
  CREATE TABLE STUDENT(
    SNO VARCHAR2(3) NOT NULL,
    SNAME VARCHAR2(8) NOT NULL,
    SSEX VARCHAR2(2) NOT NULL,
    SBIRTHDAY DATE,
    CLASS VARCHAR2(5)
  )
  ```

* 表字段添加备注

  ```text
  comment on column student.sno is '学号';
  comment on column student.sname is '学生姓名';
  comment on column student.ssex is '学生性别';
  comment on column student.sbirthday is '学生出生年月';
  comment on column student.class is '学生所在班级';
  ```

* 添加数据\(日期类型\)

  ```text
  insert ALL
    into student values(1,'a','m',to_date('2017-9-1','yyyy-MM-dd'),'一')
    into student values(2,'b','n',to_date('2009-3-1','yyyy-MM-dd'),'二')
    into student values(3,'c','m',to_date('2009-4-2','yyyy-MM-dd'),'二')
  select * from dual;
  ```

* 表添加备注

  > comment on table student is '学生表';

* 添加主键

  > alter table student add constraint sno primary key\(sno\);

* 添加索引

  > create index stu\_index on student\(sname\);

## 常用函数

* concat

  > select concat\(name,salary\) from emp;

* initcap 首字母大小,其他小写

  > select initcap\('hello world'\) from dual;//Hello World

* instr:返回指定字符串在某字符串中的位置\(下标从1开始\)

  > select instr\('hello world','w'\) from dual;

* length:返回表达式字符数

  > select length\('hello world'\) from dual;

* lengthb:返回字节数

  > select length\('你好'\) from dual;

* lower:转小写

  > select lower\('HELLO WORLD'\) from dual;

* upper:转大写

  > select upper\('hello world'\) from dual;

* lpad:当字符串长度不够时，左填充补齐\(不指定以''补齐\)

  > select lpad\('hello',20,'-\|'\) from dual;

* rpad:当字符串长度不够时，右填充补齐\(不指定以''补齐\)

  > select rpad\('hello',20,'-\|'\) from dual;

* ltrim:从字符串左侧去除空格

  > select ltrim\('-空格-hello world'\) from dual;

* rtrim:从字符串右侧去除空格

  > select rtrim\('hello world'\) from dual;

* trim:去除字符串两侧所有空格

  > select trim\(' hello world '\) from dual;

* nvl:空格转为指定字符,如不为null,返回原值

  > select name,id,salary,nvl\(dept\_id,0\) as deptId from emp;

* nvl2\(x,v1,v2\):如果部位null,返回v1;为null,返回v2

  > select nvl2\(name,'不为空','为空'\),id,salary from emp;

* replace:替换指定字符

  > select replace\('hello world','h','--'\) from dual;

* substr:返回字符串中的指定字符

  > select substr\('hello world',2,3\) from dual;

* abs:返回绝对值

  > select abs\(-10\) from dual;

* ceil:返回大于等于val的最小整数

  > select ceil\(2.3\) from dual;

* floor:返回小于等于val的最大整数

  > select floor\(2.3\) from dual;

* trunc:截取小数位

  > select trunc\(49.945,1\) from dual;

* round:四舍五入

  > select round\(47.613,2\) from dual;

* to\_char:转字符

  > select to\_char\(123\) from dual;

* to\_number:转数字

  > select to\_number\('123'\) from dual;

* cast:转为数据库兼容的类型

  > select cast\('05-7月-07' as date\) from dual;

* count:记录条数

  > select count\(\*\) from dual;

* max:取最大值

  > select max\(salary\) from emp;

* min:取最小值

  > select min\(grade\) from sc;

* sum:返回总值

  > select sum\(grade\) from sc;

