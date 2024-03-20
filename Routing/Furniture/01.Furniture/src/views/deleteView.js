import { dataService } from "../service/dataService.js";

export async function deleteItem(ctx) {
    const id = ctx.params.id;
    const res = confirm("Delete complete!");

    if (res) {
        await dataService.deleteFurniture(id);
        ctx.goTo("/");
    }
}