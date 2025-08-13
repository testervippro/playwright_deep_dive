FROM mcr.microsoft.com/playwright:v1.54.0-noble

WORKDIR /app
COPY . .
EXPOSE 9323 
RUN  npx playwright install chrome
RUN npm install

CMD ["tail", "-f", "/dev/null"]


# docker build -t my-playwright-app .
# docker run --rm -it --name playwright-container  -v "${PWD}:/app" -p 9323:9323  my-playwright-app
# docker exec -it playwright-container bash
#  npx playwright install chrome
# xvfb-run npx playwright test


