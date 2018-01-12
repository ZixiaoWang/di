class ComponentStore {

    private map: Map<any, any[]>;

    constructor() {
        this.map = new Map<any, any[]>();
    }

    getArguments(component: any): any[]{
        return this.map.get(component) || [];
    }
}

export const CONPONENT_STORE = new ComponentStore();