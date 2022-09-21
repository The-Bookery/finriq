FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy over project source
COPY . .

# Install package dependencies
RUN yarn install
RUN yarn prisma generate

RUN rm -rf dist
RUN yarn tsc

CMD [ "node", "dist/bot.js" ]