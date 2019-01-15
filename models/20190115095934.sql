/*
PostgreSQL Backup
Database: prueba/public
Backup Time: 2019-01-15 09:59:36
*/

DROP SEQUENCE IF EXISTS "public"."Actividades_id_seq";
DROP SEQUENCE IF EXISTS "public"."Actividades_invitados_id_seq";
DROP SEQUENCE IF EXISTS "public"."Ciudads_id_seq";
DROP SEQUENCE IF EXISTS "public"."Clientes_id_seq";
DROP SEQUENCE IF EXISTS "public"."Correos_id_seq";
DROP SEQUENCE IF EXISTS "public"."Departamentos_id_seq";
DROP SEQUENCE IF EXISTS "public"."Modulos_id_seq";
DROP SEQUENCE IF EXISTS "public"."Nota_id_seq";
DROP SEQUENCE IF EXISTS "public"."Opciones_id_seq";
DROP SEQUENCE IF EXISTS "public"."Rols_id_seq";
DROP SEQUENCE IF EXISTS "public"."Telefonos_id_seq";
DROP SEQUENCE IF EXISTS "public"."Usuarios_id_seq";
DROP TABLE IF EXISTS "public"."Actividades";
DROP TABLE IF EXISTS "public"."Actividades_invitados";
DROP TABLE IF EXISTS "public"."Ciudads";
DROP TABLE IF EXISTS "public"."Clientes";
DROP TABLE IF EXISTS "public"."Correos";
DROP TABLE IF EXISTS "public"."Departamentos";
DROP TABLE IF EXISTS "public"."Modulos";
DROP TABLE IF EXISTS "public"."Nota";
DROP TABLE IF EXISTS "public"."Opciones";
DROP TABLE IF EXISTS "public"."Rols";
DROP TABLE IF EXISTS "public"."SequelizeMeta";
DROP TABLE IF EXISTS "public"."Telefonos";
DROP TABLE IF EXISTS "public"."Usuarios";
CREATE SEQUENCE "public"."Actividades_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Actividades_invitados_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Ciudads_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Clientes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Correos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Departamentos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Modulos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Nota_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Opciones_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Rols_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Telefonos_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE SEQUENCE "public"."Usuarios_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
CREATE TABLE "public"."Actividades" (
  "id" int4 NOT NULL DEFAULT nextval('"Actividades_id_seq"'::regclass),
  "fecha_inicio" timestamptz(6),
  "fecha_fin" timestamptz(6),
  "tipo_actividad" int4,
  "estado_actividad" int4,
  "creado_por" int4,
  "actualizado_por" int4,
  "prioridad" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "asunto" varchar(255) COLLATE "pg_catalog"."default",
  "tipo" int4,
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "activo" bool,
  "cliente_id" int4
)
;ALTER TABLE "public"."Actividades" OWNER TO "admin";
CREATE TABLE "public"."Actividades_invitados" (
  "id" int4 NOT NULL DEFAULT nextval('"Actividades_invitados_id_seq"'::regclass),
  "acepto" bool,
  "id_usuario" int4,
  "id_actividad" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Actividades_invitados" OWNER TO "admin";
CREATE TABLE "public"."Ciudads" (
  "id" int4 NOT NULL DEFAULT nextval('"Ciudads_id_seq"'::regclass),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "id_departamento" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Ciudads" OWNER TO "admin";
CREATE TABLE "public"."Clientes" (
  "id" int4 NOT NULL DEFAULT nextval('"Clientes_id_seq"'::regclass),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "activo" bool,
  "id_ciudad" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "nit" varchar(255) COLLATE "pg_catalog"."default",
  "cn" varchar(255) COLLATE "pg_catalog"."default"
)
;ALTER TABLE "public"."Clientes" OWNER TO "admin";
CREATE TABLE "public"."Correos" (
  "id" int4 NOT NULL DEFAULT nextval('"Correos_id_seq"'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "id_cliente" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Correos" OWNER TO "admin";
CREATE TABLE "public"."Departamentos" (
  "id" int4 NOT NULL DEFAULT nextval('"Departamentos_id_seq"'::regclass),
  "nombre" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Departamentos" OWNER TO "admin";
CREATE TABLE "public"."Modulos" (
  "id" int4 NOT NULL DEFAULT nextval('"Modulos_id_seq"'::regclass),
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "identificador" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Modulos" OWNER TO "admin";
CREATE TABLE "public"."Nota" (
  "id" int4 NOT NULL DEFAULT nextval('"Nota_id_seq"'::regclass),
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "id_referencia" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "actividad" varchar(255) COLLATE "pg_catalog"."default",
  "activo" bool
)
;ALTER TABLE "public"."Nota" OWNER TO "admin";
CREATE TABLE "public"."Opciones" (
  "id" int4 NOT NULL DEFAULT nextval('"Opciones_id_seq"'::regclass),
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "modulo" int4,
  "categoria" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "activo" bool
)
;ALTER TABLE "public"."Opciones" OWNER TO "admin";
CREATE TABLE "public"."Rols" (
  "id" int4 NOT NULL DEFAULT nextval('"Rols_id_seq"'::regclass),
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;ALTER TABLE "public"."Rols" OWNER TO "admin";
CREATE TABLE "public"."SequelizeMeta" (
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;ALTER TABLE "public"."SequelizeMeta" OWNER TO "admin";
CREATE TABLE "public"."Telefonos" (
  "id" int4 NOT NULL DEFAULT nextval('"Telefonos_id_seq"'::regclass),
  "id_cliente" int4,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "numero" varchar(255) COLLATE "pg_catalog"."default"
)
;ALTER TABLE "public"."Telefonos" OWNER TO "admin";
CREATE TABLE "public"."Usuarios" (
  "id" int4 NOT NULL DEFAULT nextval('"Usuarios_id_seq"'::regclass),
  "nombres" varchar(255) COLLATE "pg_catalog"."default",
  "apellidos" varchar(255) COLLATE "pg_catalog"."default",
  "id_ciudad" int4 NOT NULL,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "activo" bool,
  "id_rol" int4
)
;ALTER TABLE "public"."Usuarios" OWNER TO "admin";
BEGIN;
LOCK TABLE "public"."Actividades" IN SHARE MODE;
DELETE FROM "public"."Actividades";
INSERT INTO "public"."Actividades" ("id","fecha_inicio","fecha_fin","tipo_actividad","estado_actividad","creado_por","actualizado_por","prioridad","createdAt","updatedAt","asunto","tipo","descripcion","activo","cliente_id") VALUES (89, '2018-12-07 05:00:00-05', '2018-12-07 05:00:00-05', 3, 11, 111, NULL, 4, '2018-12-07 14:36:17.003-05', '2018-12-07 14:36:17.003-05', 'Evento ', 8, NULL, 't', 66),(91, '2018-12-03 05:00:00-05', '2018-12-03 05:00:00-05', 1, NULL, 111, NULL, 6, '2018-12-07 15:45:51.019-05', '2018-12-07 15:45:51.019-05', 'test3', 8, 'Prueba de invitacion a actividad', 't', 5),(93, '2018-12-07 05:00:00-05', NULL, 1, NULL, 42, 111, 4, '2018-12-07 16:01:08.521-05', '2018-12-07 17:10:25.351-05', 'test5', 8, 'test5', 't', 5),(94, '2018-12-03 05:00:00-05', NULL, 1, NULL, 42, 111, 4, '2018-12-07 16:01:40.178-05', '2018-12-07 17:12:43.052-05', 'test6', 8, 'test6', 't', 66),(90, '2018-12-05 05:00:00-05', NULL, 1, NULL, 111, 42, 6, '2018-12-07 14:44:12.601-05', '2018-12-07 15:40:56.713-05', 'test', 8, 'test', 't', 66),(92, '2018-12-06 05:00:00-05', '2018-12-07 05:00:00-05', 1, NULL, 111, 42, 6, '2018-12-07 15:56:48.584-05', '2018-12-07 15:59:03.872-05', 'test4', 8, 'Prueba de invitacion a actividades', 't', 5),(95, '2018-12-03 05:00:00-05', NULL, 1, NULL, 42, 111, 4, '2018-12-07 16:04:11.351-05', '2018-12-07 17:12:44.204-05', 'test7', 8, 'test7', 't', 66);
COMMIT;
BEGIN;
LOCK TABLE "public"."Actividades_invitados" IN SHARE MODE;
DELETE FROM "public"."Actividades_invitados";
INSERT INTO "public"."Actividades_invitados" ("id","acepto","id_usuario","id_actividad","createdAt","updatedAt") VALUES (83, 't', 111, 89, '2018-12-07 14:36:17.072-05', '2018-12-07 14:36:17.072-05'),(84, 'f', 41, 89, '2018-12-07 14:36:17.072-05', '2018-12-07 14:36:17.072-05'),(85, 't', 111, 90, '2018-12-07 14:44:12.723-05', '2018-12-07 14:44:12.723-05'),(86, 't', 48, 90, '2018-12-07 14:44:12.724-05', '2018-12-07 14:47:38.204-05'),(87, 't', 42, 90, '2018-12-07 14:44:12.724-05', '2018-12-07 15:40:47.82-05'),(88, 't', 111, 91, '2018-12-07 15:45:51.038-05', '2018-12-07 15:45:51.038-05'),(89, 't', 42, 91, '2018-12-07 15:45:51.038-05', '2018-12-07 15:51:48.386-05'),(90, 't', 111, 92, '2018-12-07 15:56:48.647-05', '2018-12-07 15:56:48.647-05'),(91, 't', 42, 92, '2018-12-07 15:56:48.647-05', '2018-12-07 15:58:50.187-05'),(92, 't', 42, 93, '2018-12-07 16:01:08.57-05', '2018-12-07 16:01:08.57-05'),(95, 't', 42, 94, '2018-12-07 16:01:40.186-05', '2018-12-07 16:01:40.186-05'),(93, 't', 111, 93, '2018-12-07 16:01:08.57-05', '2018-12-07 16:01:57.886-05'),(98, 't', 42, 95, '2018-12-07 16:04:11.366-05', '2018-12-07 16:04:11.366-05'),(97, 't', 111, 94, '2018-12-07 16:01:40.186-05', '2018-12-07 16:10:06.757-05'),(99, 't', 111, 95, '2018-12-07 16:04:11.367-05', '2018-12-07 16:10:12.228-05'),(94, 't', 48, 93, '2018-12-07 16:01:08.57-05', '2018-12-07 17:48:50.483-05'),(100, 't', 48, 95, '2018-12-07 16:04:11.367-05', '2018-12-07 17:48:56.069-05'),(96, 't', 48, 94, '2018-12-07 16:01:40.186-05', '2018-12-07 17:49:00.157-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."Ciudads" IN SHARE MODE;
DELETE FROM "public"."Ciudads";
INSERT INTO "public"."Ciudads" ("id","nombre","id_departamento","createdAt","updatedAt") VALUES (42, 'Medellin', 37, '2018-10-24 15:53:36.185-05', '2018-10-24 15:53:36.185-05'),(43, 'Tulúa', 5, '2018-10-24 16:11:58.091-05', '2018-10-26 17:40:35.974-05'),(62, 'Cali', 5, '2018-10-31 10:15:07.798-05', '2018-10-31 10:15:07.798-05'),(63, 'Rio Negro', 37, '2018-10-31 10:16:48.762-05', '2018-10-31 10:16:48.762-05'),(64, 'Palmira', 5, '2018-11-06 11:43:07.996-05', '2018-11-06 11:43:07.996-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."Clientes" IN SHARE MODE;
DELETE FROM "public"."Clientes";
INSERT INTO "public"."Clientes" ("id","nombre","activo","id_ciudad","createdAt","updatedAt","nit","cn") VALUES (66, 'Allers', 't', 62, '2018-11-22 14:32:52.013-05', '2018-11-22 14:32:52.013-05', '234255636', '1244443'),(5, 'aventi', 't', 64, '2018-11-20 14:57:22-05', '2018-11-20 14:57:24-05', '346346', '02145'),(4, 'cliente1', 't', 42, '2018-11-16 10:19:12.023-05', '2018-11-16 10:38:31.169-05', '66366', '5678'),(3, 'prueba cliente', 't', 63, '2018-11-16 10:18:06.253-05', '2018-11-16 10:18:06.253-05', '346346', '1234'),(67, 'Allers2', 't', 62, '2018-11-22 14:32:52.013-05', '2018-11-22 14:32:52.013-05', '23425563', '124444'),(68, 'aventi2', 't', 64, '2018-11-20 14:57:22-05', '2018-11-20 14:57:24-05', '34634', '0214'),(69, 'cliente12', 't', 42, '2018-11-16 10:19:12.023-05', '2018-11-16 10:38:31.169-05', '6636', '567'),(70, 'prueba cliente2', 't', 63, '2018-11-16 10:18:06.253-05', '2018-11-16 10:18:06.253-05', '34634', '123');
COMMIT;
BEGIN;
LOCK TABLE "public"."Correos" IN SHARE MODE;
DELETE FROM "public"."Correos";
INSERT INTO "public"."Correos" ("id","email","id_cliente","createdAt","updatedAt") VALUES (40, 'allers@mail.co', 4, '2018-11-22 14:32:52.07-05', '2018-11-22 14:32:52.07-05'),(1, 'pruebacliente@mail.com', 5, '2018-11-16 10:09:04.497-05', '2018-11-16 10:40:20.661-05'),(2, 'cliente1@mail.com', 3, '2018-11-16 10:09:34.638-05', '2018-11-16 10:40:35.564-05'),(3, 'cliente1.1@mail.com', 66, '2018-11-19 09:15:46-05', '2018-11-19 09:15:49-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."Departamentos" IN SHARE MODE;
DELETE FROM "public"."Departamentos";
INSERT INTO "public"."Departamentos" ("id","nombre","createdAt","updatedAt") VALUES (59, 'Cundinamarca', '2018-10-30 14:54:46.302-05', '2018-10-30 14:54:46.302-05'),(5, 'Valle del Cauca', '2018-10-17 15:00:52.904-05', '2018-10-22 16:29:06.043-05'),(37, 'Antioquia', '2018-10-24 15:53:21.943-05', '2018-10-24 15:53:21.943-05'),(40, 'Cauca', '2018-10-30 10:43:25.678-05', '2018-10-30 10:43:25.678-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."Modulos" IN SHARE MODE;
DELETE FROM "public"."Modulos";
INSERT INTO "public"."Modulos" ("id","descripcion","identificador","createdAt","updatedAt") VALUES (1, 'prueba', NULL, '2018-11-13 16:34:23-05', '2018-11-13 16:34:26-05'),(2, 'prueba2', NULL, '2018-11-13 16:40:53-05', '2018-11-13 16:40:56-05'),(3, 'modulo3', NULL, '2018-11-13 17:22:10.441-05', '2018-11-13 17:22:36.125-05'),(4, 'actividades', NULL, '2018-11-14 10:52:17-05', '2018-11-14 10:52:20-05'),(5, 'clientes', NULL, '2018-11-16 10:53:32-05', '2018-11-16 10:53:35-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."Nota" IN SHARE MODE;
DELETE FROM "public"."Nota";
INSERT INTO "public"."Nota" ("id","descripcion","id_referencia","createdAt","updatedAt","actividad","activo") VALUES (1, 'Prueba Nota', 1, '2018-11-13 17:02:40-05', '2018-11-13 17:02:43-05', NULL, NULL),(2, 'Prueba 2', 2, '2018-11-13 17:03:52-05', '2018-11-13 17:03:55-05', NULL, NULL),(3, 'Nota3', 1, '2018-11-13 17:25:58.166-05', '2018-11-13 17:26:55.293-05', NULL, NULL),(6, 'sdghesfhdfbdf', NULL, '2018-11-14 11:00:45.135-05', '2018-11-14 11:00:45.135-05', '32', NULL),(7, 'sdhfdhhbsdhdfh', NULL, '2018-11-14 11:03:07.612-05', '2018-11-14 11:03:07.612-05', '32', NULL),(4, 'SDGFSDGSGDSGSDG', 4, '2018-11-14 10:34:32.715-05', '2018-11-14 10:34:32.715-05', NULL, NULL),(5, 'Prueba Nota', 4, '2018-11-14 10:56:47.071-05', '2018-11-14 10:56:47.071-05', '32', NULL),(10, 'asdfasdf', 4, '2018-11-14 14:15:37.948-05', '2018-11-14 14:15:37.948-05', '23', NULL),(11, 'Prueba', 4, '2018-11-14 14:22:03.745-05', '2018-11-14 14:22:03.745-05', '15', NULL),(8, 'dfhbdfhdfhdfhdhdfh', 4, '2018-11-14 11:07:38.96-05', '2018-11-14 11:07:38.96-05', '33', NULL),(9, 'Prueba con componente', 4, '2018-11-14 11:39:03.635-05', '2018-11-14 11:39:03.635-05', '33', NULL),(12, 'Nota 1', 4, '2018-11-14 15:46:55.167-05', '2018-11-14 15:46:55.167-05', '34', NULL),(13, 'asdfghdzfhdh', 4, '2018-11-14 16:26:54.753-05', '2018-11-14 16:26:54.753-05', '33', NULL),(14, 'asdfghdzfhdhdfhdfhh', 4, '2018-11-14 16:27:09.621-05', '2018-11-14 16:27:09.621-05', '33', NULL),(15, 'Nota 1.1', 4, '2018-11-14 16:31:44.99-05', '2018-11-14 16:31:44.99-05', '29', NULL),(16, 'Nota 1.2', 4, '2018-11-14 16:32:12.371-05', '2018-11-14 16:32:12.371-05', '7', NULL),(17, 'hfsxhgxhgx', 4, '2018-11-14 16:35:40.606-05', '2018-11-14 16:35:40.606-05', '18', NULL),(18, 'rhdfhdhdfh', 4, '2018-11-14 16:37:18.346-05', '2018-11-14 16:37:18.346-05', '15', NULL),(19, 'test', 4, '2018-11-14 16:37:52.586-05', '2018-11-14 16:37:52.586-05', '15', NULL),(20, 'zdgdgdg', 4, '2018-11-14 16:38:05.94-05', '2018-11-14 16:38:05.94-05', '20', NULL),(21, 'zdrhdfhh', 4, '2018-11-14 16:38:54.042-05', '2018-11-14 16:38:54.042-05', '21', NULL),(22, 'test', 4, '2018-11-14 16:39:50.889-05', '2018-11-14 16:39:50.889-05', '19', NULL),(23, 'Guia', 4, '2018-11-14 16:44:09.547-05', '2018-11-14 16:44:09.547-05', '34', 't'),(24, 'Guia 2', 4, '2018-11-14 16:46:57.694-05', '2018-11-14 16:46:57.694-05', '34', 't'),(25, 'Test1', 4, '2018-11-14 16:48:28.04-05', '2018-11-14 16:48:28.04-05', '23', 't'),(26, 'Nota Evento 11', 4, '2018-11-14 16:59:57.177-05', '2018-11-14 16:59:57.177-05', '17', 't'),(27, 'Prueba Cliente', 5, '2018-11-19 13:25:21.389-05', '2018-11-19 13:25:21.389-05', '4', 't'),(28, 'Prueba 2 de cliente', 5, '2018-11-19 13:26:53.128-05', '2018-11-19 13:26:53.128-05', '3', 't'),(29, 'Prueba Cliente 3', 5, '2018-11-19 13:43:33.865-05', '2018-11-19 13:43:33.865-05', '3', 't'),(30, 'Prueba 4', 5, '2018-11-19 14:31:26.774-05', '2018-11-19 14:31:26.774-05', '4', 't'),(31, 'test', 5, '2018-11-19 14:44:46.128-05', '2018-11-19 14:44:46.128-05', '4', 't'),(32, 'Cliente 2', 5, '2018-11-22 15:19:43.995-05', '2018-11-22 15:19:43.995-05', '4', 't'),(33, 'Nota Aventi', 5, '2018-11-23 15:34:38.439-05', '2018-11-23 15:34:38.439-05', '5', 't'),(34, 'Prueba 23', 4, '2018-11-27 16:27:14.108-05', '2018-11-27 16:27:14.108-05', '6', 't'),(35, 'Prueba 24', 4, '2018-11-27 16:27:20.814-05', '2018-11-27 16:27:20.814-05', '6', 't'),(36, 'Prueba Allers', 5, '2018-11-27 16:48:18.963-05', '2018-11-27 16:48:18.963-05', '66', 't');
COMMIT;
BEGIN;
LOCK TABLE "public"."Opciones" IN SHARE MODE;
DELETE FROM "public"."Opciones";
INSERT INTO "public"."Opciones" ("id","descripcion","modulo","categoria","createdAt","updatedAt","activo") VALUES (1, 'Eventos', 4, 1, '2018-11-07 16:00:17.824-05', '2018-11-07 16:00:17.824-05', 't'),(4, 'Alta', 4, 3, '2018-11-13 10:13:13-05', '2018-11-13 10:13:21-05', 't'),(6, 'Media', 4, 3, '2018-11-13 10:13:45-05', '2018-11-13 10:13:48-05', 't'),(7, 'Baja', 4, 3, '2018-11-13 10:14:25-05', '2018-11-13 10:14:28-05', 't'),(3, 'Tareas', 4, 1, '2018-11-07 16:05:48.412-05', '2018-11-07 16:05:48.412-05', 't'),(8, 'Evento Cobro', 4, 2, '2018-11-13 10:14:54-05', '2018-11-13 10:14:56-05', 't'),(9, 'Evento Visita', 4, 2, '2018-11-13 10:15:16-05', '2018-11-13 10:15:19-05', 't'),(10, 'Vencido', 4, 4, '2018-11-13 13:18:29-05', '2018-11-13 13:18:32-05', 't'),(11, 'En Cola', 4, 4, '2018-11-13 13:18:46-05', '2018-11-13 13:18:50-05', 't'),(12, 'Vigente', 4, 4, '2018-11-13 13:19:11-05', '2018-11-13 13:19:15-05', 't'),(13, 'Ejecutado', 4, 4, '2018-11-13 13:19:32-05', '2018-11-13 13:19:41-05', 't'),(14, 'Planeado', 4, 4, '2018-11-13 13:20:10-05', '2018-11-13 13:20:14-05', 't');
COMMIT;
BEGIN;
LOCK TABLE "public"."Rols" IN SHARE MODE;
DELETE FROM "public"."Rols";
INSERT INTO "public"."Rols" ("id","descripcion","createdAt","updatedAt") VALUES (1, 'Administrador', '2018-12-04 14:29:02-05', '2018-12-04 14:29:04-05'),(2, 'Usuario', '2018-12-04 14:29:19-05', '2018-12-04 14:29:23-05');
COMMIT;
BEGIN;
LOCK TABLE "public"."SequelizeMeta" IN SHARE MODE;
DELETE FROM "public"."SequelizeMeta";
INSERT INTO "public"."SequelizeMeta" ("name") VALUES ('20181017152813-create-usuario.js'),('20181017152917-create-ciudad.js'),('20181017152944-create-departamento.js');
COMMIT;
BEGIN;
LOCK TABLE "public"."Telefonos" IN SHARE MODE;
DELETE FROM "public"."Telefonos";
INSERT INTO "public"."Telefonos" ("id","id_cliente","createdAt","updatedAt","numero") VALUES (2, 4, '2018-11-16 10:45:18.311-05', '2018-11-16 10:45:18.311-05', '256485621'),(1, 3, '2018-11-16 10:14:14.585-05', '2018-11-16 10:46:02.737-05', '3564565'),(3, 4, '2018-11-20 11:19:35-05', '2018-11-20 11:19:38-05', '54555445'),(4, 3, '2018-11-20 11:19:51-05', '2018-11-20 11:19:53-05', '6571254'),(26, 66, '2018-11-22 14:32:52.07-05', '2018-11-22 14:32:52.07-05', '45679898');
COMMIT;
BEGIN;
LOCK TABLE "public"."Usuarios" IN SHARE MODE;
DELETE FROM "public"."Usuarios";
INSERT INTO "public"."Usuarios" ("id","nombres","apellidos","id_ciudad","createdAt","updatedAt","email","password","activo","id_rol") VALUES (112, 'Prueba pass', 'Prueba pass', 63, '2018-12-07 15:04:29.878-05', '2018-12-07 15:04:29.878-05', 'pass@mail.es', '5b722b307fce6c944905d132691d5e4a2214b7fe92b738920eb3fce3a90420a19511c3010a0e7712b054daef5b57bad59ecbd93b3280f210578f547f4aed4d25', 't', 2),(111, 'andres', 'garcia', 63, '2018-11-30 11:29:47-05', '2018-12-07 15:09:08.86-05', 'a', '1f40fc92da241694750979ee6cf582f2d5d7d28e18335de05abc54d0560e0f5302860c652bf08d560252aa5e74210546f369fbbbce8c12cfc7957b2652fe9a75', 't', 2),(41, 'Esteban', 'Perez', 62, '2018-11-01 14:27:43.446-05', '2018-12-07 15:38:14.651-05', 'esteban@mail.es', '5a1384e44bc5065ac3525fda4a8266f62be6ccd0b9fa566ef30611cf9ea24b1d0b5eb34fd273adfacff204b83a00e641e6c589410df928ecbedebaae95841cb3', 't', 1),(42, 'Camila', 'barbosa', 63, '2018-11-06 11:37:01.034-05', '2018-12-07 15:38:27.407-05', 'camila@mail.com', '33ce88bb4e16c9c9b838c62f9044304c4553b14c1bd92aeb520c0b261649f91d95603d1615d3bc1c81e757b9e8a540671e0762addf2eac6a2f01e68caaa73518', 't', 2),(39, 'Michael 5', 'Perez', 43, '2018-10-31 16:31:20.451-05', '2018-12-07 15:38:40.139-05', 'michael@prueba.es', '34e1fd6820ce1e79fbbdaae3fc708b634ab1d9765c215b7cd88d4c0c750e87b8c1d478b6112d95ae7bd165f9f73d165263ef7fcee357b48c6bc1f6b591f94ab8', 't', 2),(38, 'Jose', 'Martinez', 64, '2018-10-31 13:57:27.43-05', '2018-12-07 15:39:13.621-05', 'jose@mail.es', '107d125c183b9cebc75f71f6c225879d17fb6a8edcc551372bccc85b6301ad8b69d8623700f83b78010b96e8e08e819e41f79a949d442b5de468bcc376884df6', 't', 2),(48, 'Carlos', 'Perez', 42, '2018-11-13 14:59:30.113-05', '2018-12-07 15:39:24.505-05', 'carlos@mail.es', 'ba1714df5f5d4640794b3a5509fae0a4e30f60a0af28fa55d2b305072889f232e50f848f3e96c35edd571cfebbef22f56faf459d8ac6fefe65ffc768bc808016', 't', 2);
COMMIT;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "Actividades_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Actividades_invitados" ADD CONSTRAINT "Actividades_invitados_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Ciudads" ADD CONSTRAINT "Ciudads_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Clientes" ADD CONSTRAINT "Clientes_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Correos" ADD CONSTRAINT "Correos_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Departamentos" ADD CONSTRAINT "Departamentos_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Modulos" ADD CONSTRAINT "Modulos_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Nota" ADD CONSTRAINT "Nota_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Opciones" ADD CONSTRAINT "Opciones_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Rols" ADD CONSTRAINT "Rols_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."SequelizeMeta" ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name");
ALTER TABLE "public"."Telefonos" ADD CONSTRAINT "Telefonos_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Usuarios" ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id");
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "actualizado_por_foreign_idx" FOREIGN KEY ("actualizado_por") REFERENCES "public"."Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "cliente_id_foreign_idx" FOREIGN KEY ("cliente_id") REFERENCES "public"."Clientes" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "creado_por_foreign_idx" FOREIGN KEY ("creado_por") REFERENCES "public"."Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "estado_actividad_foreign_idx" FOREIGN KEY ("estado_actividad") REFERENCES "public"."Opciones" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "prioridad_foreign_idx" FOREIGN KEY ("prioridad") REFERENCES "public"."Opciones" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "tipo_actividad_foreign_idx" FOREIGN KEY ("tipo_actividad") REFERENCES "public"."Opciones" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades" ADD CONSTRAINT "tipo_foreign_idx" FOREIGN KEY ("tipo") REFERENCES "public"."Opciones" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades_invitados" ADD CONSTRAINT "id_actividad_foreign_idx" FOREIGN KEY ("id_actividad") REFERENCES "public"."Actividades" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Actividades_invitados" ADD CONSTRAINT "id_usuario_foreign_idx" FOREIGN KEY ("id_usuario") REFERENCES "public"."Usuarios" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Ciudads" ADD CONSTRAINT "id_departamento_foreign_idx" FOREIGN KEY ("id_departamento") REFERENCES "public"."Departamentos" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."Clientes" ADD CONSTRAINT "id_ciudad_foreign_idx" FOREIGN KEY ("id_ciudad") REFERENCES "public"."Ciudads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Correos" ADD CONSTRAINT "id_cliente_foreign_idx" FOREIGN KEY ("id_cliente") REFERENCES "public"."Clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Nota" ADD CONSTRAINT "id_referencia_foreign_idx" FOREIGN KEY ("id_referencia") REFERENCES "public"."Modulos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Opciones" ADD CONSTRAINT "modulo_foreign_idx" FOREIGN KEY ("modulo") REFERENCES "public"."Modulos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Telefonos" ADD CONSTRAINT "id_cliente_foreign_idx" FOREIGN KEY ("id_cliente") REFERENCES "public"."Clientes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Usuarios" ADD CONSTRAINT "id_ciudad_foreign_idx" FOREIGN KEY ("id_ciudad") REFERENCES "public"."Ciudads" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Usuarios" ADD CONSTRAINT "id_rol_foreign_idx" FOREIGN KEY ("id_rol") REFERENCES "public"."Rols" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER SEQUENCE "public"."Actividades_id_seq"
OWNED BY "public"."Actividades"."id";
SELECT setval('"public"."Actividades_id_seq"', 96, true);
ALTER SEQUENCE "public"."Actividades_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Actividades_invitados_id_seq"
OWNED BY "public"."Actividades_invitados"."id";
SELECT setval('"public"."Actividades_invitados_id_seq"', 101, true);
ALTER SEQUENCE "public"."Actividades_invitados_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Ciudads_id_seq"
OWNED BY "public"."Ciudads"."id";
SELECT setval('"public"."Ciudads_id_seq"', 73, true);
ALTER SEQUENCE "public"."Ciudads_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Clientes_id_seq"
OWNED BY "public"."Clientes"."id";
SELECT setval('"public"."Clientes_id_seq"', 97, true);
ALTER SEQUENCE "public"."Clientes_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Correos_id_seq"
OWNED BY "public"."Correos"."id";
SELECT setval('"public"."Correos_id_seq"', 43, true);
ALTER SEQUENCE "public"."Correos_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Departamentos_id_seq"
OWNED BY "public"."Departamentos"."id";
SELECT setval('"public"."Departamentos_id_seq"', 102, true);
ALTER SEQUENCE "public"."Departamentos_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Modulos_id_seq"
OWNED BY "public"."Modulos"."id";
SELECT setval('"public"."Modulos_id_seq"', 6, true);
ALTER SEQUENCE "public"."Modulos_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Nota_id_seq"
OWNED BY "public"."Nota"."id";
SELECT setval('"public"."Nota_id_seq"', 37, true);
ALTER SEQUENCE "public"."Nota_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Opciones_id_seq"
OWNED BY "public"."Opciones"."id";
SELECT setval('"public"."Opciones_id_seq"', 15, true);
ALTER SEQUENCE "public"."Opciones_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Rols_id_seq"
OWNED BY "public"."Rols"."id";
SELECT setval('"public"."Rols_id_seq"', 3, true);
ALTER SEQUENCE "public"."Rols_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Telefonos_id_seq"
OWNED BY "public"."Telefonos"."id";
SELECT setval('"public"."Telefonos_id_seq"', 29, true);
ALTER SEQUENCE "public"."Telefonos_id_seq" OWNER TO "admin";
ALTER SEQUENCE "public"."Usuarios_id_seq"
OWNED BY "public"."Usuarios"."id";
SELECT setval('"public"."Usuarios_id_seq"', 113, true);
ALTER SEQUENCE "public"."Usuarios_id_seq" OWNER TO "admin";
