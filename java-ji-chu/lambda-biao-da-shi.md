# lambda表达式

--jdk version:1.8以上

## 1.无参函数简写

```java
//例子：线程
//以前的写法
new Thread(new Runnable() {//接口
    @Override
    public void run() {//方法
        System.out.println("Thread Run!");
    }
}).start();//启动线程

//lambda写法
//省略接口名和方法名
new Thread(() -> System.out.println("Thread run way two!")).start();

//多行使用{}
new Thread(() -> {
    System.out.println("hello");
    System.out.println("world");
}).start();
```

## 2.带参函数简写

```java
排序写法
//JDK7写法
List<String> list = Arrays.asList("I","LOVE","YOU","TOO");
Collections.sort(list, new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        if(s1 == null) return -1;
        if(s2 == null) return 1;
        return s1.length() - s2.length();
    }
});
System.out.println(list);//[I, YOU, TOO, LOVE]

//lambda写法
List<String> listOther = Arrays.asList("I","LOVE","YOU","TOO");
Collections.sort(listOther , (s1,s2) -> {
    if(s1 == null) return -1;
    if(s2 == null) return 1;
    return s1.length()-s2.length();
});
System.out.println(listOther);//[I, YOU, TOO, LOVE]
```

tips:

[Arrays类相关方法](https://blog.csdn.net/goodbye_youth/article/details/81003817>)

[Collections用法](https://blog.csdn.net/zhzh402/article/details/79672092>)

## 3.自定义函数接口

```java
/**
 * 自定义函数接口
 */
@FunctionalInterface //检查函数是否符合函数接口规范,使用该注解只能存在一个抽象方法
public interface ConsumerInterface {

    //add
    void add(String message);
}

public static void main(String[] args) {
    ConsumerInterface consumer = message -> System.out.println("hello"+message);
    consumer.add(" world"); //hello world
}
```

## 4.了解collections的相关方法

#### forEach:

```java
//获取字符串长度超过3的字符串
static void getLengthOverThree() {
    List<String> list = Arrays.asList("hello","love","ki","ov","string");
    for (String s : list) {
        if(s.length() > 3) {
            System.out.println(s);
        }
    }

    System.out.println("-----------------");

    //使用forEach结合匿名内部类迭代
    list.forEach(new Consumer<String>() {
        @Override
        public void accept(String s) {
            if(s.length() > 3) {
                System.out.println(s);
            }
        }
    });

    System.out.println("-----------------");

    //使用lambda
    list.forEach(str -> {
        if(str.length() > 3)
            System.out.println(str);
    });
}
```

#### removeIf:\(删除容器中满足filter指定条件的元素\)

```java
//删除元素
static void deleteLengthOverThree() {
    //必须这样写,否则会报java.lang.UnsupportedOperationException,因为内部类没有重写
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    List<String> list2 = new ArrayList<>();
    List<String> list3 = new ArrayList<>();
    list2.addAll(list);
    list3.addAll(list);
    //使用迭代器删除列表元素
    Iterator<String> it = list.iterator();
    while (it.hasNext()) {
        if(it.next().length() > 3) {
            it.remove();
        }
    }
    System.out.println(list);

    System.out.println("---------------------");

    //使用removeif结合匿名内部类
    list2.removeIf(new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s.length() > 3;
        }
    });
    System.out.println(list2);

    System.out.println("----------------------");

    //使用lambed
    list3.removeIf(s -> {
        return s.length() > 3;
    });
    System.out.println(list3);
}
```

#### replaceAll:\(对每个元素执行指定操作,并用操作结果替换原来的元素\)

```java
//元素替换
static void replaceAll() {
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    //使用下标实现元素替换
    for (int i = 0,size = list.size();i < size;i++) {
        String str = list.get(i);
        list.set(i , str.toLowerCase());
    }
    System.out.println(list);

    list.replaceAll(new UnaryOperator<String>() {
        @Override
        public String apply(String s) {
            return s.toUpperCase();
        }
    });
    System.out.println(list);

    list.replaceAll(s -> {
        return s.toLowerCase();
    });
    System.out.println(list);
}
```

#### sort:根据指定比较规则对元素进行排序

```java
//元素排序
static void sort() {
    List<String> list = new ArrayList<>(Arrays.asList("I","LOVE","YOU","TOO"));
    Collections.sort(list, new Comparator<String>() {
        @Override
        public int compare(String s, String t1) {
            return s.length() - t1.length();
        }
    });

    Collections.sort(list,(s, t1) ->  s.length() - t1.length());

    list.sort((s, t1) -> s.length() - t1.length());

    list.sort(Comparator.naturalOrder()); //升序
    list.sort(Comparator.reverseOrder());//降序
    System.out.println(list);
}
```

tips:

[Java8 Comparator 排序方法](https://www.jianshu.com/p/3f621e51f306>)

## 5.了解Map中的新方法

#### forEach:

```java
//forEach
static void mapForEach() {
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    for(Map.Entry<Integer,String> entry : map.entrySet()) {
        System.out.println(entry.getKey() + ":" + entry.getValue());
    }

    //使用Map.forEach配合匿名内部类
    map.forEach(new BiConsumer<Integer, String>() {
        @Override
        public void accept(Integer integer, String s) {
            System.out.println(integer + ":" + s);
        }
    });

    //lambda
    map.forEach((integer, s) -> System.out.println(integer + ":" + s));
}
```

#### getOrDefault:（按照指定key查询对应value,如果没有返回默认值）

```java
/**
    * 按照key进行查询,如不存在返回默认值
    */
static void getAllDefault() {
    Map<Integer,Object> map = new HashMap<>();
    map.put(1,"hello");
    map.put(2,"world");
    map.put(3,"say");
    //jdk7以及之前
    if(map.containsKey(4)) {
        System.out.println(map.get(4));
    } else {
        System.out.println("no value");
    }

    //jdk8
    map.getOrDefault(4,"no value");
}
```

#### pulfAbsent:（只有在不存在key值的映射或映射值为null时，才将value指定的值放入Map中,否则部队Map做更改）

```java
map.putIfAbsent(4,"hello"); //不存在或为null时才生效
System.out.println(map);
```

#### replace:

> JDK7及以前,可通过put\(k,v\)方法实现
>
> JDK8加入了replace方法\(2个\)
>
> ​ .- replace\(k,v\),只有在当前map中存在key的映射才会替换
>
> ​ - replace\(key,oldValue,newValue\),只有存在key的映射且值等于oldValue时才会替换

```java
map.replace(4,"vvv");
System.out.println(map);

map.replace(4,"vvv","sss");
System.out.println(map);
```

#### replaceAll:全部替换

```java
//全部替换
static void mapReplaceAll() {
    //jdk1.7
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    for(Map.Entry<Integer,String> entry : map.entrySet()) {
        entry.setValue(entry.getValue().toUpperCase());
    }
    System.out.println(map);

    //replaceAll结合匿名内部类
    map.replaceAll(new BiFunction<Integer, String, String>() {
        @Override
        public String apply(Integer integer, String s) {
            return s.toLowerCase();
        }
    });
    System.out.println(map);

    //lambda
    map.replaceAll((integer, s) -> s.toUpperCase());
    System.out.println(map);
}
```

#### merge:

> 1.如果Map中key对应的映射不存在或者为null,则将value\(不能为null\)关联到key上
>
> 2.否则执行remappingFunction,如果执行结果为非null则用该结果跟key关联,否则在map中删除key的映射

```java
static void merge() {
    Map<Integer,Integer> map = new HashMap<>();
    map.put(1,100);
    map.put(2,200);
    map.put(3,300);
    map.merge(1,10,(v1,v2) -> v1+v2);
    System.out.println(map);//{1=110, 2=200, 3=300}
}
```

#### compute\(\):把计算结果关联到key上,如果计算结果为null，则在map中删除key的映射

> 例:实现错误信息拼接
>
> map.compute\(key,\(k,v\) -&gt; v == null ? newMsg : v.concat\(newMsg\)\);

```java
//实现错误信息拼接
static void compute() {
    HashMap<Integer,String> map = new HashMap<>();
    map.put(1,"one");
    map.put(2,"two");
    map.put(3,"three");
    map.compute(1,(k, v) -> v == null ? "wrong" : v.concat("wrong"));
    System.out.println(map);//{1=onewrong, 2=two, 3=three}
}
```

#### computeIfAbsent

> 只有在当前map中不存在key值的映射或映射值为null时,才调用mappingFunction，并在mappingFunction执行结果中为非null,将结果跟key关联

```java
//多值映射并添加新值
static void computeIfAbsent() {
    Map<Integer,Set<String>> map = new HashMap<>();
    if(map.containsKey(1)) {
        map.get(1).add("one");
    } else {
        Set<String> set = new HashSet<>();
        set.add("yi");
        map.put(1,set);
    }

    //jdk1.8
    map.computeIfAbsent(2,integer -> new HashSet<String>()).add("一");
    System.out.println(map);//{1=[yi], 2=[一]}
}
```

## 6.Streams API

> java8之所以费大工夫引入函数式编程原因:
>
> 1.代码简洁函数式编程写出的代码简洁且意图明显,使用stream接口告别for循环
>
> 2.多核友好,java函数式编程使得编写并行程序更加简单,需要的全部就是调用parallel\(\)方法

stream不是一种数据结构,只是数据源的一种视图。数据源可以是数组,java容器,i/o channel等。通常stream不会手动创建,而是调用对应的工具方法，比如：

* 调用Collection.stream\(\)或者Collection.parallelStream\(\)方法
* 调用Arrays.stream\(T\[\] array\)方法

  ![./img/p1.png](https://github.com/sineava/markdown/tree/8188e3f7aea74d759346b732e7ba716a062ac6c4/home/l/code/front/markdown笔记/java基础/img/p1.png)

其中IntStream,LongStream,DoubleStream对应三种基本数据类型\(int,long,double--不是包装类型\),Stream对应所有剩余类的stream视图。为不同数据类型设置不同stream接口--&gt;1.可以提高性能2.增加特定接口函数

stream和collections的不同:

* 无存储.stream不是一种数据结构,只是某种数据源的一个视图,数据源是一个视图,数据源可以是一个数组,java容器,或io channel等
* 为函数式编程而生,对stream的任何修改都不会修改背后的数据源,比如对stream执行过滤操作并不会删除被过滤的元素,而是产生一个不包含被过滤元素的新stream
* 惰式执行,stream上的操作并不会立即执行,只有等用户真正需要结果的时候才会执行
* _stream_只能被“消费”一次，一旦遍历过就会失效，就像容器的迭代器那样，想要再次遍历必须重新生成。

| 操作类型 | 接口方法 |
| :--- | :--- |
| 中间操作 | concat\(\) distinct\(\) filter\(\) flatMap\(\) limit\(\) map\(\) peek\(\)  skip\(\) sorted\(\) parallel\(\) sequential\(\) unordered\(\) |
| 结束操作 | allMatch\(\) anyMatch\(\) collect\(\) count\(\) findAny\(\) findFirst\(\)  forEach\(\) forEachOrdered\(\) max\(\) min\(\) noneMatch\(\) reduce\(\) toArray\(\) |

#### forEach

```java
// 使用Stream.forEach()迭代
Stream<String> stream = Stream.of("I", "love", "you", "too");
stream.forEach(str -> System.out.println(str));
```

#### filter\(去除重复元素\)

```java
Stream<String> stream = Stream.of("i","los","sdg","love");
stream.filter(s -> s.length() == 3).forEach(s -> System.out.println(s));
```

#### sorted\(自定义排序\)

```java
Stream<String> stream = Stream.of("i","love","you","too");
stream.sorted((x,y) -> x.length() - y.length()).forEach(x -> System.out.println(x));
```

#### toUpperCase

```java
Stream<String> stream　= Stream.of("I", "love", "you", "too");
stream.map(str -> str.toUpperCase())
    .forEach(str -> System.out.println(str));
```

#### flatMap:合并

```java
Stream<List<Integer>> stream = Stream.of(Arrays.asList(1,2,3),Arrays.asList(11,5));
stream.flatMap(list -> list.stream()).forEach(i -> System.out.println(i));
```

#### reduce

```java
// 找出最长的单词
Stream<String> stream = Stream.of("I", "love", "you", "too");
Optional<String> longest = stream.reduce((s1, s2) -> s1.length()>=s2.length() ? s1 : s2);
//Optional<String> longest = stream.max((s1, s2) -> s1.length()-s2.length());
System.out.println(longest.get());
```

```java
//计算一组字符串长度
Stream<String> stream = Stream.of("hi","i","ok","too");
Integer length = stream.reduce(0,(sum, str) -> sum+str.length(),(a, b) -> a + b);//8
```

## 7.collect:多数功能可通过collect实现

```java
 //将stream转为容器或map
Stream<String> stream = Stream.of("ji","sfj","sff","too","ok");
//List<String> list = stream.collect(Collectors.toList());
//Set<String> set = stream.collect(Collectors.toSet());
Map<String,Object> map = stream.collect(Collectors.toMap(Function.identity(),String::length));
System.out.println(map);//注意:stream执行后会立即关闭
```

> 一.Function.identity\(\)是干什么的?
>
> _Function_是一个接口，那么`Function.identity()`是什么意思呢？这要从两方面解释：
>
> 1. Java 8允许在接口中加入具体方法。接口中的具体方法有两种，_default_方法和_static_方法，`identity()`就是_Function_接口的一个静态方法。
> 2. `Function.identity()`返回一个输出跟输入一样的Lambda表达式对象，等价于形如`t -> t`形式的Lambda表达式。
>
> 二.String::length是干什么的?
>
> 诸如`String::length`的语法形式叫做方法引用（_method references_），这种语法用来替代某些特定形式Lambda表达式。如果Lambda表达式的全部内容就是调用一个已有的方法，那么可以用方法引用来替代Lambda表达式。方法引用可以细分为四类：
>
> | 方法引用类别 | 举例 |
> | :--- | :--- |
> | 引用静态方法 | Integer::sum |
> | 引用某个对象的方法 | list::add |
> | 引用某个类的方法 | String::length |
> | 引用构造方法 | HashMap::new |
>
> 三.Collector是什么?
>
> 收集器（_Collector_）是为`Stream.collect()`方法量身打造的工具接口（类）,
>
> _collect\(\)_方法定义为`<R> R collect(Supplier<R> supplier, BiConsumer<R,? super T> accumulator, BiConsumer<R,R> combiner)`

### 使用collect\(\)生成Collection

前面已经提到通过`collect()`方法将_Stream_转换成容器的方法，这里再汇总一下。将_Stream_转换成_List_或_Set_是比较常见的操作，所以_Collectors_工具已经为我们提供了对应的收集器，通过如下代码即可完成：

```java
// 将Stream转换成List或Set
Stream<String> stream = Stream.of("I", "love", "you", "too");
List<String> list = stream.collect(Collectors.toList()); // (1)
Set<String> set = stream.collect(Collectors.toSet()); // (2)
```

上述代码能够满足大部分需求，但由于返回结果是接口类型，我们并不知道类库实际选择的容器类型是什么，有时候我们可能会想要人为指定容器的实际类型，这个需求可通过`Collectors.toCollection(Supplier<C> collectionFactory)`方法完成。

```java
// 使用toCollection()指定规约容器的类型
ArrayList<String> arrayList = stream.collect(Collectors.toCollection(ArrayList::new));// (3)
HashSet<String> hashSet = stream.collect(Collectors.toCollection(HashSet::new));// (4)
```

### 使用collect\(\)生成Map

* 使用`Collectors.toMap()`生成的收集器，用户需要指定如何生成_Map_的_key_和_value_

```java
// 使用toMap()统计学生GPA
Map<Student, Double> studentToGPA =
students.stream().collect(Collectors.toMap(Function.identity(),// 如何生成key
    student -> computeGPA(student)));// 如何生成value
```

* 使用`partitioningBy()`生成的收集器，这种情况适用于将`Stream`中的元素依据某个二值逻辑（满足条件，或不满足）分成互补相交的两部分，比如男女性别、成绩及格与否等。

```java
// Partition students into passing and failing
Map<Boolean, List<Student>> passingFailing = students.stream()
         .collect(Collectors.partitioningBy(s -> s.getGrade() >= PASS_THRESHOLD));
```

* 情况3：使用`groupingBy()`生成的收集器，这是比较灵活的一种情况。跟SQL中的_group by_语句类似，这里的_groupingBy\(\)_也是按照某个属性对数据进行分组

```java
// Group employees by department
Map<Department, List<Employee>> byDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::getDepartment));
```

以上只是分组的最基本用法，有些时候仅仅分组是不够的。在SQL中使用_group by_是为了协助其他查询，比如_1. 先将员工按照部门分组，2. 然后统计每个部门员工的人数_。Java类库设计者也考虑到了这种情况，增强版的`groupingBy()`能够满足这种需求。增强版的`groupingBy()`允许我们对元素分组之后再执行某种运算，比如求和、计数、平均值、类型转换等。这种先将元素分组的收集器叫做**上游收集器**，之后执行其他运算的收集器叫做**下游收集器**\(_downstream Collector_\)。

```java
// 使用下游收集器统计每个部门的人数
Map<Department, Integer> totalByDept = employees.stream()
                    .collect(Collectors.groupingBy(Employee::getDepartment,
                                                   Collectors.counting()));// 下游收集器
```

上面代码的逻辑是不是越看越像SQL？高度非结构化。还有更狠的，下游收集器还可以包含更下游的收集器，这绝不是为了炫技而增加的把戏，而是实际场景需要。考虑将员工按照部门分组的场景，如果_我们想得到每个员工的名字（字符串），而不是一个个_Employee_对象_，可通过如下方式做到：

```java
// 按照部门对员工分布组，并只保留员工的名字
Map<Department, List<String>> byDept = employees.stream()
                .collect(Collectors.groupingBy(Employee::getDepartment,
                        Collectors.mapping(Employee::getName,// 下游收集器
                                Collectors.toList())));// 更下游的收集器
```

### 使用collect\(\)做字符串join

```java
// 使用Collectors.joining()拼接字符串
Stream<String> stream = Stream.of("I", "love", "you");
//String joined = stream.collect(Collectors.joining());// "Iloveyou"
//String joined = stream.collect(Collectors.joining(","));// "I,love,you"
String joined = stream.collect(Collectors.joining(",", "{", "}"));// "{I,love,you}"
```

```java
int longestStringLengthStartingWithA
        = strings.stream()
              .filter(s -> s.startsWith("A"))
              .mapToInt(String::length)
              .max();
```

stream操作分类

| Stream操作分类 |  |  |
| :--- | :--- | :---: |
| 中间操作\(Intermediate operations\) | 无状态\(Stateless\) | unordered\(\) filter\(\) map\(\) mapToInt\(\) mapToLong\(\) mapToDouble\(\) flatMap\(\) flatMapToInt\(\) flatMapToLong\(\) flatMapToDouble\(\) peek\(\) |
|  | 有状态\(Stateful\) | distinct\(\) sorted\(\) sorted\(\) limit\(\) skip\(\) |
| 结束操作\(Terminal operations\) | 非短路操作 | forEach\(\) forEachOrdered\(\) toArray\(\) reduce\(\) collect\(\) max\(\) min\(\) count\(\) |
|  | 短路操作\(short-circuiting\) | anyMatch\(\) allMatch\(\) noneMatch\(\) findFirst\(\) findAny\(\) |

