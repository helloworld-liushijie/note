# 存储过程

### [资料参考:存储过程详解](https://www.cnblogs.com/chenpi/p/5136483.html)

## 什么是存储过程？

> > 存储过程可以说是一个记录集吧，它是由一些T-SQL语句组成的代码块，这些T-SQL语句代码像一个方法一样实现一些功能（对单表或多表的增删改查），然后再给这个代码块取一个名字，在用到这个功能的时候调用他就行了。

## 存储过程好处

> > 1.由于数据库执行动作时，是先编译后执行的。然而存储过程是一个编译过的代码块，所以执行效率要比T-SQL语句高。 2.一个存储过程在程序在网络中交互时可以替代大堆的T-SQL语句，所以也能降低网络的通信量，提高通信速率。 3.通过存储过程能够使没有权限的用户在控制之下间接地存取数据库，从而确保数据的安全。

## 特性

> > 有输入输出参数，可以声明变量，有if/else, case,while等控制语句，通过编写存储过程，可以实现复杂的逻辑功能； 函数的普遍特性：模块化，封装，代码复用； 速度快，只有首次执行需经过编译和优化步骤，后续被调用可以直接执行，省去以上步骤；

## 存储过程的语法与参数讲解

-----------创建存储过程--------------------

### 传参写法，也可以不传入参数

三种参数类型:

> > in传入参数:表示调用者向过程传入值\(传入值可以是字面量或变量\) out传入参数:表示过程向调用者传出值\(可以返回多个值\)\(传出值只能是变量\) inout输入输出参数：既表示调用者向过程传入值，又表示过程向调用者传出值\(值只能是变量\)
> >
> > ### 写法建议
> >
> > 输入值使用in参数； 返回值使用out参数； inout参数尽量少用。
> >
> > ```text
> > CREATE PROCEDURE select_operate( [in|out|inout] id int) 
> > BEGIN
> > select * from temp where emp_id = int;
> > ...
> > END;
> > ```
> >
> > --------------调用存储过程-----------------
> >
> > ```text
> > call select_operate();
> > ```
> >
> > --------------删除存储过程-----------------
> >
> > ```text
> > DROP PROCEDURE select_operate;
> > ```

### 示例一:

```text
drop procedure if exists select_operate;
create procedure select_operate(in a int,in b int,out sum int)
begin
    if a is null then set a = 0;
    end if;
    if b is null then set b = 0;
    end if;
    set sum = a + b;
end;
set @b = 5;
call select_operate(2,@b,@s);
select @s as num;//7
```

### 示例二:

```text
drop procedure if exists demo;
create procedure `demo`(in type int)
begin
    declare i varchar(32);
    if type = 0 then 
    set i = 'this is 0';
    elseif type = 1 then 
    set i = 'this is 1';
    else
    set i = 'this is nor 0 and 1';
    end if;
    select i as res;
end;
set @type = 0;
call demo(@type);
```

### 示例三:

```text
DROP PROCEDURE IF EXISTS `proc_while`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_while`(IN n int)
BEGIN
    #Routine body goes here...
    DECLARE i int;
    DECLARE s int;
    SET i = 0;
    SET s = 0;
    WHILE i <= n DO
        set s = s + i;
        set i = i + 1;
    END WHILE;
    SELECT s;
END
;;
DELIMITER ;
set @type=100;
call proc_while(@type);
```

