export class MenuItem {
  constructor(
    public menuId: number,
    public name: string,
    public level: number,
    public icon: string,
    children: MenuItem[]
  ) { }
}
