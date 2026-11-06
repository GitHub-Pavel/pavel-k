const fs = require('fs');
const path = require('path');

const fastify = require('fastify')({
  logger: true
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets',
});

const langHTML = {
  ru: fs.readFileSync('ru.html', 'utf8'),
  en: fs.readFileSync('en.html', 'utf8'),
};

fastify.get('/', async (request, reply) => {
  reply.header(
      'Link',
      '</assets/cyrillic.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/latin.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/fonts.css>; rel=preload; as=style'
  );
  return reply.type('text/html').send(langHTML.ru);
})

fastify.get('/:lang', async (request, reply) => {
  reply.header(
    'Link',
    '</assets/cyrillic.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/latin.woff2>; rel=preload; as=font; type=font/woff2; crossorigin, </assets/fonts.css>; rel=preload; as=style'
  );
  const { lang } = request.params;
  console.log(lang);
  const html = langHTML[lang];
  if (!html) {
    return reply.status(404).send({
      statusCode: 404,
      error: 'Page not found',
      message: 'Page not found'
    });
  }
  return reply.type('text/html').send(html);
});

fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
