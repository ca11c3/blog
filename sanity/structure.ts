import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title("Blog")
		.items([
			S.documentTypeListItem("post").title("Posts"),
			S.documentTypeListItem("category").title("Categories"),
			S.listItem()
				.title("Landing Content")
				.child(
					S.document()
						.schemaType("landingContent")
						.documentId("landingContent"),
				),
			S.divider(),
			...S.documentTypeListItems().filter(
				(item) =>
					item.getId() &&
					!["post", "category","landingContent"].includes(item.getId()!),
			),
		]);
