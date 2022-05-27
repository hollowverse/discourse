import { apiInitializer } from 'discourse/lib/api';

export default apiInitializer('0.11.1', (api) => {
  if (/.*#reply$/g.test(document.URL)) {
    const { REPLY } = require('discourse/models/composer').default;

    const composer = Discourse.__container__.lookup('controller:composer');

    setTimeout(function () {
      const topic = Discourse.__container__
        .lookup('controller:topic')
        .get('model');
      if (topic) {
        composer.open({
          action: REPLY,
          draftKey: topic.draft_key,
          draftSequence: topic.draft_sequence,
          topic,
        });
      }
    }, 0);
  }
});
