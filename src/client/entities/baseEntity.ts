interface BaseEntity {
    x: number;
    y: number;

    update(): void;
    render(): void;
}

export default BaseEntity;