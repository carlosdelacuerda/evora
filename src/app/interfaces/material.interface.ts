export interface MaterialInterface {
    Material: string,
    Quantity: string,
    DescTxt: string,
    CustomerPrice: string,
    CustomerCurrency: string,
    RepairPrice: string,
    RepairCurrency: string,
    Available: string,
    ExtUnit: string,
    MatStatus: string,
    StorageLoc: string,
    StorageLocDesc: string,
    NDFQuote: string,
    NDFCounter: string,
    TSPercentage: string,
    TSPercentageCounter: string
}

export interface MaterialsListInterface {
    d : {
        FrontId: string,
        NotificationNo: string,
        PartSet: {
          results: MaterialInterface[]
        }
    }
}

export interface reducerListInterface {
    type: string,
    error?: any,
    materials: MaterialsListInterface
}