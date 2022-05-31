SELECT
  sub.geom AS sub_geom,
  sub.cron,
  sub.profile_id,
  sub.description,
  trees.name,
  trees.geom AS tree_geom,
  trees.type
FROM (
  SELECT
    pr.prediction,
    pr.tree_id,
    dt.id,
    dt.name,
    dt.geom,
    dt.type
  FROM
    dummy_predictions pr
    JOIN dummy_trees dt ON pr.tree_id = dt.id) AS trees
  JOIN subscriptions sub ON ST_intersects (sub.geom, trees.geom);

