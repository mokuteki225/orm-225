export class CompiledQuery {
  constructor(
    private readonly statement: string,
    private readonly values: any[],
  ) {}
}
