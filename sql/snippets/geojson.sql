INSERT INTO "public".subscriptions (description, geom, cron, profile_id)
  VALUES ('Sunday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 0', '374046de-fcd3-417d-aab1-1467b8fac043'),('Monday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 1', '374046de-fcd3-417d-aab1-1467b8fac043'),('Tuesday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 2', '374046de-fcd3-417d-aab1-1467b8fac043'),('Wednesday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 3', '374046de-fcd3-417d-aab1-1467b8fac043'),('Thursday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 4', '374046de-fcd3-417d-aab1-1467b8fac043'),('Friday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 5', '374046de-fcd3-417d-aab1-1467b8fac043'),('Saturday', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 6', '374046de-fcd3-417d-aab1-1467b8fac043');

SELECT
  ST_AsGeoJSON (geom)
FROM
  subscriptions;

