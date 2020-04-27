---
title: docker上手
date: '2019-07-02T21:19:01.000Z'
categories:
  - docker
tags:
  - server
---

# docker上手

## docker安装

资料参考：

安装环境-ubuntu 18.04\(终端\)

> 1.sudo apt install docker.io
>
> 2.sudo systemctl start docker
>
> 3.sudo systemctl enable docker

* 查看docker是否安装完成

> docker -v

* docker使用

  > 例：docker search mysql --实际相当于在[https://hub.docker.com/进行查询](https://hub.docker.com/进行查询)

* docker下载库\(加name即可\)

  > docker pull mysql -- 默认下载latest版本

* docker换源

  > 1.修改json文件：vi /etc/docker/daemon.json-加入如下代码 { "registry-mirrors" : \["[https://docker.mirrors.ustc.edu.cn](https://docker.mirrors.ustc.edu.cn)"\] } 2.重启服务 sudo service docker restart \|\|如果出现以下问题,可通过重启服务解决 Error response from daemon: Get [https://registry-1.docker.io/v2/](https://registry-1.docker.io/v2/): dial tcp: lookup registry-1.docker.io: no such host

* 查看docker镜像

  > docker images

* 下载指定版本镜像\(版本可以在网站查找\)

  > docker pull mysql:5.5

* 镜像删除

  > docker rmi image-id

## 容器安装

软件镜像\(qq安装程序\)-运行镜像-产生一个新容器\(正在运行的软件\)

步骤：

> 1.搜索镜像
>
> docker search tomcat
>
> 2.拉取镜像
>
> docker pull tomcat
>
> 3.根据镜像启动容器
>
> docker run --name container-name -d image-name
>
> 如:docker run --mytomcat -d tomcat
>
> --name:自定义容器名
>
> -d:后台运行
>
> image-name:指定镜像模板
>
> 4.查看运行中的容器
>
> docker ps
>
> 5.docker停止
>
> docker stop container\_id
>
> 6.查看所有的容器
>
> docker ps -a
>
> 7.删除容器（rmi是删除镜像,rm是删除容器）
>
> docker rm contaner\_id
>
> 8.端口映射\(-p\) -8888映射8080--- 需要关闭防火墙服务
>
> docker run -d -p 8888:8080 tomcat
>
> 9.查看防火墙状态
>
> sudo ufw status
>
> 10.容器日志
>
> docker logs container-name/container-id
>
> 更多命令查看:
>
> [https://docs.docker.com/engine/reference/commandline/docker](https://docs.docker.com/engine/reference/commandline/docker)

## docker安装mysql

> 具体操作参考dockerhub
>
> 1.docker pull mysql
>
> 2.$ docker run --name some-mysql -e MYSQL\_ROOT\_PASSWORD=my-secret-pw -d mysql:tag

