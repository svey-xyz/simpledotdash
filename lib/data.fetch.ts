import Ajv from "ajv/dist/jtd"
import data from "@data/config.json"
import { AnySchema } from "ajv/dist/core"
import { config, schema } from "@/lib/data.schema"

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

function validate(data: any) {
	const validate = ajv.compile(schema as AnySchema)
	const isValid = validate(data)

	if (!isValid) console.log(validate.errors)
	return isValid;
}

export function getData() {
	return validate(data) ? data as config : undefined;
}

