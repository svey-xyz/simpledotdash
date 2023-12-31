import Ajv from "ajv/dist/jtd"
import data from "@data/config.json"
import { AnySchema, AnyValidateFunction } from "ajv/dist/core"
import { config, schema } from "@/lib/data.schema"

const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
const validator = ajv.compile(schema as AnySchema)

export type configData = {
	isValid: boolean | Promise<unknown>;
	data: config | undefined;
	validator: AnyValidateFunction<unknown>;
}

function validate(data: any) {
	const isValid = validator(data)

	if (!isValid) console.log(validator.errors)
	return isValid;
}

export function getData() {
	const configData: configData = {
		isValid: validate(data),
		data: validate(data) ? data as config : undefined,
		validator: validator
	}
	return configData;
}

