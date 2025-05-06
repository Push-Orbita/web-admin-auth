import { TreeNode } from 'primereact/treenode';

interface Selection {
    [key: string]: {
        checked: boolean;
        partialChecked: boolean;
    };
}

export const buildTreeSelectSelection = (nodes: TreeNode[], selection: Selection): Selection => {
    const newSelection = { ...selection };

    const processNode = (node: TreeNode) => {
        if (node.key && typeof node.key === 'string') {
            if (node.key.startsWith("accion-")) {
                newSelection[node.key] = {
                    checked: true,
                    partialChecked: false
                };
            }
        }

        if (node.children) {
            node.children.forEach(processNode);
        }
    };

    nodes.forEach(processNode);
    return newSelection;
}; 