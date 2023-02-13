FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

RUN apt -y update && apt -y upgrade && apt -y install python3-pip

## For devcontainer, persists bash history
RUN SNIPPET="echo test" 

