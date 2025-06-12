WITH RECURSIVE folder_tree AS (
  SELECT id
  FROM "Folder"
  WHERE id = $1

  UNION ALL

  SELECT f.id
  FROM "Folder" f
  JOIN folder_tree ft ON f."parentFolderId" = ft.id
)
SELECT id from folder_tree;