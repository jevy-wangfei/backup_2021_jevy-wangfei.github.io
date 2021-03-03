---
title: Dockerize conda
dd: dockerizeconda
category: timeline
tags: article
image: https://docs.conda.io/en/latest/_images/conda_logo.svg
---
# Wrap conda into docker
## prepare env.yml file
```json
name: test
channels:
  - conda-forge
dependencies:
  - flask
``` 
## prepare Dockerfile
```
FROM continuumio/miniconda3

WORKDIR /conda

# Create conda env using env.yml:
COPY env.yml .
RUN conda env create -f env.yml

# Should activate the conda env test here, but execute conda activate test will throw an error:  conda init is required

# This code does not help too
# RUN source ~/minikube/etc/profile.d/conda.sh
# RUN conda activate test

# That is because every new step of docker build, a new shell will be startup. 
# The new shell would not know where is conda

# This would also cause problem when executing the docker as another new shell will be created

COPY . .

# Here is the solution 
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "test", "python", "other_code.py"]
```


