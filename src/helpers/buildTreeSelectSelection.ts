import { TreeNode } from "primereact/treenode";

interface TreeSelectState {
    [key: string]: { checked: boolean; partialChecked: boolean };
}

/**
 * Construye el estado de selección del TreeSelect (con modo checkbox)
 * a partir de una lista de IDs seleccionados (ej: de accionesPorRol del back).
 */
export const buildTreeSelectSelection = (tree: TreeNode[], selectedIds: number[]): TreeSelectState => {
    const selection: TreeSelectState = {};

    const isSelected = (key: string) => selection[key]?.checked;

    const processNode = (node: TreeNode): boolean => {
        const children = node.children ?? [];
        let selectedCount = 0;

        for (const child of children) {
            const childSelected = processNode(child);
            if (childSelected) selectedCount++;
        }

        if (node.key?.startsWith("accion-")) {
            const id = parseInt(node.key.replace("accion-", ""));
            if (selectedIds.includes(id)) {
                selection[node.key] = { checked: true, partialChecked: false };
                return true;
            }
            return false;
        }

        if (children.length > 0) {
            if (selectedCount === children.length) {
                selection[node.key!] = { checked: true, partialChecked: false };
                return true;
            } else if (selectedCount > 0) {
                selection[node.key!] = { checked: false, partialChecked: true };
                return true;
            }
        }

        return false;
    };

    for (const topLevel of tree) {
        processNode(topLevel);
    }

    return selection;
};
