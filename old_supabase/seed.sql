INSERT INTO "public"."dummy_trees" ("type", "name", "geom")
  VALUES ('Tilia cordata', '_21001863d0', 'SRID=4326;POINT(13.49513 52.62566)'), ('Acer platanoides', '_2100191121', 'SRID=4326;POINT(13.49947 52.62643)'), ('Tilia cordata', '_21001863d7', 'SRID=4326;POINT(13.49569 52.6261)'), ('Prunus cerasifera ''Nigra''', '_210019106d', 'SRID=4326;POINT(13.49335 52.62601)'), ('Populus x canadensis Hybride', '_2100191073', 'SRID=4326;POINT(13.49375 52.62588)'), ('Tilia tomentosa', '_2100184fe0', 'SRID=4326;POINT(13.49131 52.62226)'), ('Sorbus aucuparia', '_210019153d', 'SRID=4326;POINT(13.49926 52.62573)'), ('Tilia intermedia ''Pallida''', '_2100193512', 'SRID=4326;POINT(13.49927 52.62783)'), ('Crataegus crus-galli', '_210021a037', 'SRID=4326;POINT(13.21098 52.60661)'), ('Unbekannt', '_210026ec67', 'SRID=4326;POINT(13.17217 52.55662)');

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

INSERT INTO "public".dummy_predictions ("prediction", "tree_id")
  VALUES ((
      SELECT
        (ARRAY['gut', 'schlecht', 'durstig'])[floor(random() * 3 + 1)]),
      (
        SELECT
          id
        FROM
          dummy_trees OFFSET floor(random() * (
            SELECT
              count(1)
            FROM dummy_trees))
        LIMIT 1));

