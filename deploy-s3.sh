#! /bin/bash

PREFIX=
SUFFIX=_$(date +%m%d%H%M%S).zip

PROFILE=gs-cf
BUCKET=june26-dev
SRCS=src
DIST=./dist

rm -rf ${DIST}
mkdir ${DIST}

for SUB in $(ls -d ${SRCS}/*/ 2>/dev/null);
do
  N=${SUB#${SRCS}/}
  N=${N%/}
  ZN=${PREFIX}${N}${SUFFIX}
  echo "zip ${SUB}* to ${ZN}"  
  zip -j ${DIST}/${ZN} ${SUB}*
  echo "S3 Path> https://s3.ap-northeast-2.amazonaws.com/${BUCKET}/${ZN}"
done
echo "start upload ..."
aws s3 --profile ${PROFILE} cp ./dist/* s3://${BUCKET}/
echo "all archives uploaded !"
