-- Author: Sylvi Kokko <sylvi.kokko@tuni.fi>
-- Date: 2025-11-29
-- File: 013-foreign-keys-between-track-artist-and-album.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS dual;

CREATE TABLE dual (dummy CHAR NOT NULL);

INSERT INTO dual (dummy) VALUES ('');

BEGIN TRANSACTION;

PRAGMA defer_foreign_keys = ON;

SELECT dummy AS 'CREATE TABLE: track' FROM dual;

DROP TABLE IF EXISTS track;

CREATE TABLE track
(
   id          INTEGER       NOT NULL UNIQUE
   , name      VARCHAR(150)
   , artist    INTEGER

   , CONSTRAINT track__id_pk
     PRIMARY KEY (id)

   , CONSTRAINT artist__track_fk
     FOREIGN KEY (artist)
     REFERENCES artist (id)
);

COMMIT;

SELECT dummy AS 'CREATE TABLE: artist' FROM dual;

DROP TABLE IF EXISTS artist;

CREATE TABLE artist
(
    id         INTEGER          NOT NULL UNIQUE
    , name   VARCHAR(150)

    , CONSTRAINT artist__id_pk
      PRIMARY KEY (id)
);

SELECT dummy AS 'CREATE TABLE: album_tracks' FROM dual;

DROP TABLE IF EXISTS album_tracks;

CREATE TABLE album_tracks
(
    track         INTEGER
    , album    INTEGER

    , CONSTRAINT album_tracks__track_pk
     PRIMARY KEY (track)

    , CONSTRAINT album_tracks__album_pk
     PRIMARY KEY (album)

    , CONSTRAINT track__album_tracks_fk
      FOREIGN KEY (track)
      REFERENCES track (id)

    , CONSTRAINT album__album_tracks_fk
     FOREIGN KEY (album)
     REFERENCES album (id)
);

SELECT dummy AS 'CREATE TABLE: album' FROM dual;

DROP TABLE IF EXISTS album;

CREATE TABLE album
(
    id         INTEGER          NOT NULL UNIQUE
    , name     VARCHAR(150)
    , year     INTEGER
    , label    VARCHAR(150)

    , CONSTRAINT album__id_pk
      PRIMARY KEY (id)
);


SELECT dummy AS 'INSERT INTO: artist' FROM dual;

INSERT INTO artist
    (id, name)
VALUES
    (1, 'Kaarija')
;

INSERT INTO artist
    (id, name)
VALUES
    (2, 'Abba')
;


INSERT INTO artist
    (id, name)
VALUES
    (3, 'Billie Eilish')
;


SELECT dummy AS 'INSERT INTO: track' from dual;

INSERT INTO track
    (id, name, artist)
VALUES
    (1, 'Yhtä vailla', 1)
;

INSERT INTO track
    (id, name, artist)
VALUES
    (2, 'Waterloo', 2)
;

INSERT INTO track
    (id, name, artist)
VALUES
    (3, 'Ocean Eyes', 3)
;

SELECT dummy AS 'INSERT INTO: album' from dual;

INSERT INTO album
    (id, name, year, label)
VALUES
    (1, 'Fantastista', 2020, 'Monsp Records')
;

INSERT INTO album
    (id, name, year, label)
VALUES
    (2, 'People’s Champion', 2024, 'Warner Music')
;

INSERT INTO album
    (id, name, year, label)
VALUES
    (3, 'Waterloo', 1974, 'Polar')
;
INSERT INTO album
    (id, name, year, label)
VALUES
    (4, 'Don’t Smile at Me', 2015, 'Drup Music')
;

SELECT dummy AS 'INSERT INTO: album_tracks' from dual;

INSERT INTO album_tracks
    (track, album)
VALUES
    (1, 1)
;

INSERT INTO album_tracks
    (track, album)
VALUES
    (2, 2)
;

INSERT INTO album_tracks
    (track, album)
VALUES
    (3, 4)
;

-- album = 3 does not exist
INSERT INTO album_tracks
    (track, album)
VALUES
    (3, 5)
;