# 反射

资料参考: [深入解析java反射](https://www.sczyh30.com/posts/Java/java-reflection-1/)

## 什么是反射?

> 允许运行中的java程序获取自身信息,并且可以操作类或对象的内部属性。通过反射，我们可以在运行时获得程序或程序集中每一个类型的成员和成员的信息。程序中一般的对象的类型都是在编译期就确定下来的，而 Java 反射机制可以动态地创建对象并调用其属性，这样的对象的类型在编译期是未知的。所以我们可以通过反射机制直接创建对象，即使这个对象的类型在编译期是未知的。

## 反射的核心

> JVM在运行时才动态加载类或调用方法/访问属性,不需要事先知道运行对象是谁

## 反射功能\(是运行时而不是编译时\)

```text
1.在运行时判断任意一个对象所属的类
2.在运行时构造任意一个类的对象
3.在运行时判断任意一个类所具有的成员变量和方法(通过反射甚至可以调用private方法)
4.在运行时调用任意一个对象的方法
```

## 反射的基本运用

* 获取Class对象
* 使用 Class 类的 forName 静态方法

  ```text
  获取数据库驱动:
  Class.forName("com.mysql.jdbc.Driver");
  ```

* 直接获取某一对象的class

  ```text
  Class<?> klass = int.class;
  Class<?> classInt = Integer.TYPE;
  ```

* 调用某个对象的getClass方法

  ```text
  StringBuilder str = new StringBuilder("123");
  Class<?> klass = str.getClass();
  ```

* 判断是否为某个类的实例\(Class 对象的 isInstance\(\) 方法来判断是否为某个类的实例\)

  ```text
  public native boolean isInstance(Object obj);
  ```

* 创建实例
* 使用Class对象的newInstance\(\)方法来创建Class对象对应类的实例

  ```text
  Class<?> c = String.class;
  Object str = c.newInstance();
  ```

* 先通过Class对象获取指定的Constructor对象，再调用Constructor对象的newInstance\(\)方法来创建实例

  ```text
  //获取String所对应的Class对象
  Class<?> c = String.class;
  //获取String类带一个String参数的构造器
  Constructor constructor = c.getConstructor(String.class);
  //根据构造器创建实例
  Object obj = constructor.newInstance("23333");
  System.out.println(obj);
  ```

* 获取方法

  > getDeclaredMethods 方法返回类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法。 public Method\[\] getDeclaredMethods\(\) throws SecurityException

> getMethods 方法返回某个类的所有公用（public）方法，包括其继承类的公用方法。 public Method\[\] getMethods\(\) throws SecurityException
>
> getMethod 方法返回一个特定的方法，其中第一个参数为方法名称，后面的参数为方法的参数对应Class的对象。 public Method getMethod\(String name, Class&lt;?&gt;... parameterTypes\)

* 获取构造器信息\(根据传入的参数来调用对应的Constructor创建对象实例\)

  ```text
  public T newInstance(Object ... initargs)
  --- Constructor constructor = stringInstance.getConstructor(String.class);
    String str = (String)constructor.newInstance("string 构造器");
  ```

* 获取类的成员变量（字段）信息

  > getFiled：访问公有的成员变量

> getDeclaredField：所有已声明的成员变量，但不能得到其父类的成员变量
>
> getFileds 和 getDeclaredFields 方法用法同上（参照 Method）。

* 调用方法

  > public Object invoke\(Object obj, Object... args\)

* 利用反射创建数组

  ```text
  public static void testArray() throws ClassNotFoundException {
    Class<?> cls = Class.forName("java.lang.String");
    Object array = Array.newInstance(cls,25);
    //往数组里添加内容
    Array.set(array,0,"hello");
    Array.set(array,1,"Java");
    Array.set(array,2,"fuck");
    Array.set(array,3,"Scala");
    Array.set(array,4,"Clojure");
    //获取某一项的内容
    System.out.println(Array.get(array,3));
  }
  ```

