# -*- coding: utf-8 -*-

# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: google/cloud/extended_operations.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import enum_type_wrapper
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database

# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import descriptor_pb2 as google_dot_protobuf_dot_descriptor__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(
    b"\n&google/cloud/extended_operations.proto\x12\x0cgoogle.cloud\x1a google/protobuf/descriptor.proto*b\n\x18OperationResponseMapping\x12\r\n\tUNDEFINED\x10\x00\x12\x08\n\x04NAME\x10\x01\x12\n\n\x06STATUS\x10\x02\x12\x0e\n\nERROR_CODE\x10\x03\x12\x11\n\rERROR_MESSAGE\x10\x04:_\n\x0foperation_field\x12\x1d.google.protobuf.FieldOptions\x18\xfd\x08 \x01(\x0e\x32&.google.cloud.OperationResponseMapping:?\n\x17operation_request_field\x12\x1d.google.protobuf.FieldOptions\x18\xfe\x08 \x01(\t:@\n\x18operation_response_field\x12\x1d.google.protobuf.FieldOptions\x18\xff\x08 \x01(\t::\n\x11operation_service\x12\x1e.google.protobuf.MethodOptions\x18\xe1\t \x01(\t:A\n\x18operation_polling_method\x12\x1e.google.protobuf.MethodOptions\x18\xe2\t \x01(\x08\x42y\n\x10\x63om.google.cloudB\x17\x45xtendedOperationsProtoP\x01ZCgoogle.golang.org/genproto/googleapis/cloud/extendedops;extendedops\xa2\x02\x04GAPIb\x06proto3"
)

_OPERATIONRESPONSEMAPPING = DESCRIPTOR.enum_types_by_name["OperationResponseMapping"]
OperationResponseMapping = enum_type_wrapper.EnumTypeWrapper(_OPERATIONRESPONSEMAPPING)
UNDEFINED = 0
NAME = 1
STATUS = 2
ERROR_CODE = 3
ERROR_MESSAGE = 4

OPERATION_FIELD_FIELD_NUMBER = 1149
operation_field = DESCRIPTOR.extensions_by_name["operation_field"]
OPERATION_REQUEST_FIELD_FIELD_NUMBER = 1150
operation_request_field = DESCRIPTOR.extensions_by_name["operation_request_field"]
OPERATION_RESPONSE_FIELD_FIELD_NUMBER = 1151
operation_response_field = DESCRIPTOR.extensions_by_name["operation_response_field"]
OPERATION_SERVICE_FIELD_NUMBER = 1249
operation_service = DESCRIPTOR.extensions_by_name["operation_service"]
OPERATION_POLLING_METHOD_FIELD_NUMBER = 1250
operation_polling_method = DESCRIPTOR.extensions_by_name["operation_polling_method"]

if _descriptor._USE_C_DESCRIPTORS == False:
    google_dot_protobuf_dot_descriptor__pb2.FieldOptions.RegisterExtension(
        operation_field
    )
    google_dot_protobuf_dot_descriptor__pb2.FieldOptions.RegisterExtension(
        operation_request_field
    )
    google_dot_protobuf_dot_descriptor__pb2.FieldOptions.RegisterExtension(
        operation_response_field
    )
    google_dot_protobuf_dot_descriptor__pb2.MethodOptions.RegisterExtension(
        operation_service
    )
    google_dot_protobuf_dot_descriptor__pb2.MethodOptions.RegisterExtension(
        operation_polling_method
    )

    DESCRIPTOR._options = None
    DESCRIPTOR._serialized_options = b"\n\020com.google.cloudB\027ExtendedOperationsProtoP\001ZCgoogle.golang.org/genproto/googleapis/cloud/extendedops;extendedops\242\002\004GAPI"
    _OPERATIONRESPONSEMAPPING._serialized_start = 90
    _OPERATIONRESPONSEMAPPING._serialized_end = 188
# @@protoc_insertion_point(module_scope)
