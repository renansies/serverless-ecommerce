#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ProductAppStack } from '../lib/productsApp-stack'
import { ECommerceApiStack } from '../lib/e_commerce_api-stack'

const app = new cdk.App();

const env: cdk.Environment = {
  account: "322094740524",
  region: "us-east-1"
}

const tags = {
  cost: "ECommerce",
  team: "SiesLabs"
}

const productsAppStack = new ProductAppStack(app, "ProductsAppStack", {
  tags: tags,
  env: env
})

const eCommerceApiStack = new ECommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags: tags,
  env: env
})

eCommerceApiStack.addDependency(productsAppStack)
