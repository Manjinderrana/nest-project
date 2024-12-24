export class CommonCRUD {
  constructor(protected readonly provider: any) {}
  async create(data: any): Promise<any> {
    try {
      return await this.provider.create(data)
    } catch (error) {
      throw new Error(
        `Error creating ${this.constructor.name} ${error.message}`,
      )
    }
  }

  async findById(data: any): Promise<any> {
    try {
      return await this.provider.findById(data)
    } catch (error) {
      throw new Error(
        `Error creating ${this.constructor.name} ${error.message}`,
      )
    }
  }

  async find(data: any): Promise<any> {
    try {
      return await this.provider.find(data)
    } catch (error) {
      throw new Error(
        `Error creating ${this.constructor.name} ${error.message}`,
      )
    }
  }

  async update(data: any): Promise<any> {
    try {
      return await this.provider.update(data)
    } catch (error) {
      throw new Error(
        `Error creating ${this.constructor.name} ${error.message}`,
      )
    }
  }
}
