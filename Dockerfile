FROM registry.cn-hangzhou.aliyuncs.com/petkit-saas/web:latest

MAINTAINER "mantas.cn" <mantas.cn>

#
# WEB
#

# 镜像中存放的文件路径
ARG WEB_BASE_DIR=/proj/web
ARG WEB_PATH=dist

# nginx的项目配置文件路径
ARG NGINX_DIR_CONF=/etc/nginx/conf.d

RUN mkdir -p ${WEB_BASE_DIR} && \
    rm -f ${NGINX_DIR_CONF}/default.conf

COPY ${WEB_PATH} ${WEB_BASE_DIR}/dist/
COPY nginx_svc.conf ${NGINX_DIR_CONF}/

#
# ENTRYPOINT
#

# COPY entrypoint.sh /start.sh

# RUN chmod a+x /start.sh

# ENTRYPOINT ["/start.sh"]
