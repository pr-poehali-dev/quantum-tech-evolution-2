"""
Функции для работы с анкетами собак URALDOG Екатеринбург.
GET / — получить список всех анкет
POST / — сохранить новую анкету
"""

import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, breed, age, district, owner_name, about, created_at FROM dogs ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        dogs = [
            {
                "id": r[0],
                "name": r[1],
                "breed": r[2],
                "age": r[3],
                "district": r[4],
                "owner_name": r[5],
                "about": r[6],
                "created_at": r[7].isoformat() if r[7] else None,
            }
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"dogs": dogs}, ensure_ascii=False),
        }

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        breed = (body.get("breed") or "").strip()
        age = (body.get("age") or "").strip()
        district = (body.get("district") or "").strip()
        owner_name = (body.get("owner_name") or "").strip()
        about = (body.get("about") or "").strip()

        if not all([name, breed, age, district, owner_name]):
            return {
                "statusCode": 400,
                "headers": cors,
                "body": json.dumps({"error": "Заполни все обязательные поля"}, ensure_ascii=False),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO dogs (name, breed, age, district, owner_name, about) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (name, breed, age, district, owner_name, about),
        )
        dog_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {
            "statusCode": 201,
            "headers": cors,
            "body": json.dumps({"id": dog_id, "success": True}, ensure_ascii=False),
        }

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
