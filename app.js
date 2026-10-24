const fs = require('fs');
const path = require('path');

const fastify = require('fastify')({
  logger: true
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets',
});


fastify.get('*', function (request, reply) {
    reply.type('text/html').send(fs.readFileSync('index.html', 'utf8'));
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});