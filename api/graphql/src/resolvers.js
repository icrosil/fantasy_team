const baseURI = 'https://fantasy.premierleague.com/api';
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 3650 });

// populating cache
// 1.Cache bootstrap-static

fetch(`${baseURI}/bootstrap-static/`)
  .then(res => res.json())
  .then(json => {
    cache.set('events', json.events);
    cache.set('teams', json.teams);
    cache.set('players', json.elements);
  });

fetch(`${baseURI}/fixtures/`)
  .then(res => res.json())
  .then(json => cache.set('fixtures', json));

const getTeams = () => {
  const cached = cache.get('teams');
  if (cached === undefined) {
    return fetch(`${baseURI}/bootstrap-static/`)
      .then(res => res.json())
      .then(json => {
        cache.set('teams', json.teams);
        return json.teams;
      });
  }
  return cached;
};

const getTeam = async id => {
  const cached = await getTeams();
  return cached.find(t => t.id === id);
};

const getTeamShortName = async id => {
  const team = await getTeam(id);
  return team.short_name;
};

const getPlayer = id => {
  const cached = cache.get('players');
  if (cached === undefined) {
    return fetch(`${baseURI}/bootstrap-static/`)
      .then(res => res.json())
      .then(json => {
        cache.set('players', json.elements);
        return json.elements.find(p => p.id === id);
      });
  }
  return cached.find(p => p.id === id);
};

const getPlayerByName = webName => {
  const cached = cache.get('players');
  if (cached === undefined) {
    return fetch(`${baseURI}/bootstrap-static/`)
      .then(res => res.json())
      .then(json => {
        cache.set('players', json.elements);
        return json.elements.find(p => p.web_name === webName);
      });
  }
  return cached.find(p => p.web_name === webName);
};

const resolvers = {
  Query: {
    event: (_, args) => {
      const { id } = args;
      const cached = cache.get('events');
      if (cached === undefined) {
        return fetch(`${baseURI}/bootstrap-static/`)
          .then(res => res.json())
          .then(json => {
            cache.set('events', json.events);
            return json.events.find(g => g.id === id);
          });
      }
      return cached.find(g => g.id === id);
    },

    events: () => {
      const cached = cache.get('events');
      if (cached === undefined) {
        return fetch(`${baseURI}/bootstrap-static/`)
          .then(res => res.json())
          .then(json => {
            cache.set('events', json);
            return json;
          });
      }
      return cached;
    },

    team: (_, args) => getTeam(args.id),

    teams: () => getTeams(),

    fixture: (_, args) => {
      const { id } = args;
      const cached = cache.get('fixtures');
      if (cached === undefined) {
        return fetch(`${baseURI}/fixtures/`)
          .then(res => res.json())
          .then(json => {
            cache.set('fixtures', json);
            return json.find(f => f.id === id);
          });
      }
      return cached.find(f => f.id === id);
    },

    player: (_, args) => (args.id ? getPlayer(args.id) : getPlayerByName(args.name)),

    entry: (_, args) => {
      const { id } = args;
      return fetch(`${baseURI}/entry/${id}/`).then(res => res.json());
    },

    entryHistory: async (_, args) => {
      const data = await fetch(`${baseURI}/entry/${args.id}/history/`);
      return data.json();
    },

    live: async (_, args) => {
      const data = await fetch(`${baseURI}/event/${args.event}/live/`);
      const json = await data.json();
      const elements = await json.elements;
      return elements.find(el => el.id === args.id);
    },

    picks: async (_, args) => {
      const data = await fetch(`${baseURI}/entry/${args.entry}/event/${args.event}/picks/`);
      return data.json();
    },

    playerSummary: async (_, args) => {
      const data = await fetch(`${baseURI}/element-summary/${args.id}/`);
      return data.json();
    },
  },

  Team: {
    players: parent => {
      const { id } = parent;
      const cached = cache.get('players');
      if (cache.get('players') === undefined) {
        return fetch(`${baseURI}/bootstrap-static/`)
          .then(res => res.json())
          .then(json => {
            cache.set('players', json.elements);
            return json.elements.filter(p => p.team === id);
          });
      }
      return cached.filter(p => p.team === id);
    },
    fixtures: parent => {
      const { id } = parent;
      const cached = cache.get('fixtures');
      if (cached === undefined) {
        return fetch(`${baseURI}/fixtures/`)
          .then(res => res.json())
          .then(json => {
            cache.set('fixtures', json);
            return json.filter(x => x.team_a === id || x.team_a === id);
          });
      }
      return cached.filter(x => x.team_a === id || x.team_h === id);
    },
  },

  Fixture: {
    team_h: parent => getTeam(parent.team_h),

    team_a: parent => getTeam(parent.team_a),

    stats: parent => parent.stats.filter(x => x.a.length + x.h.length !== 0),
  },

  FixtureStat: {
    player: parent => getPlayer(parent.element),
  },

  Player: {
    team: parent => getTeam(parent.team),
  },

  Event: {
    most_selected: parent => getPlayer(parent.most_selected),
    most_transferred_in: parent => getPlayer(parent.most_transferred_in),
    top_element: parent => getPlayer(parent.top_element),
    most_captained: parent => getPlayer(parent.most_captained),
    most_vice_captained: parent => getPlayer(parent.most_transferred_in),
    fixtures: parent => {
      const { id } = parent;
      const cached = cache.get('fixtures');
      if (cached === undefined) {
        return fetch(`${baseURI}/fixtures/`)
          .then(res => res.json())
          .then(json => {
            cache.set('fixtures', json);
            return json.filter(f => f.event === id);
          });
      }
      return cached.filter(f => f.event === id);
    },
  },

  EntryHistory: {
    current: parent => parent.current,
  },

  EventHistory: {
    event: parent => {
      const id = parent.event;
      return fetch(`${baseURI}/bootstrap-static/`)
        .then(res => res.json())
        .then(json => json.events.find(g => g.id === id));
    },
  },

  Live: {
    player: parent => getPlayer(parent.id),
    explain: parent => parent.explain[0],
  },

  Explain: {
    fixture: parent => {
      const id = parent.fixture;
      return fetch(`${baseURI}/fixtures/`)
        .then(res => res.json())
        .then(json => json.find(f => f.id === id));
    },
  },

  Pick: {
    player: parent => getPlayer(parent.element),
  },

  PlayerSummary: {
    fixtures: async parent => {
      return parent.fixtures.map(async fx => ({
        ...fx,
        team_h_name: await getTeamShortName(fx.team_h),
        team_a_name: await getTeamShortName(fx.team_a),
      }));
    },

    history: parent => {
      return parent.history.map(async h => ({
        ...h,
        opponent_team: await getTeamShortName(h.opponent_team),
      }));
    },
  },
};

module.exports = resolvers;
