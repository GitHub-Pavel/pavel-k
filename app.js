const fs = require('fs');
const path = require('path');

const fastify = require('fastify')({
  logger: true
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets',
});

const html = fs.readFileSync('index.html', 'utf8');

fastify.get('*', async (request, reply) => {
  reply.header(
      'Link',
      '</assets/cyrillic.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/latin.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/fonts.css>; rel=preload; as=style'
    );
  reply.type('text/html').send(html);
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
