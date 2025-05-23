#!/bin/bash
cd /home/kavia/workspace/code-generation/techsphere-3d-portfolio-14305-14311/techsphere_3d_portfolio
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

