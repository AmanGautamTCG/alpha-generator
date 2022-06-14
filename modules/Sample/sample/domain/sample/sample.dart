import 'dart:convert';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hive/hive.dart';

part 'sample.freezed.dart';
part 'sample.g.dart';

@freezed
class Sample with _$Sample {
  @JsonSerializable(includeIfNull: false)
  const factory Sample({
    @JsonKey(name: '_id') String? id,
    String? uid,
    String? self,
    String? actID,
    String? name,
    String? mediaID,
    String? caption,
    int? views,
    bool? isActive,
    bool? isDeleted,
    String? description,
    DateTime? createdOn,
    DateTime? updatedOn,
  }) = _Sample;

  factory Sample.fromJson(Map<String, dynamic> json) =>
      _$SampleFromJson(json);
  
  factory Sample.fromBox({required SampleBox box}) =>
      Sample.fromJson(json.decode(box.data as String) as Map<String, dynamic>);    
}

@HiveType(typeId: 5, adapterName: 'SampleBoxAdapter')
class SampleBox {
  SampleBox({this.self, this.data});

  factory SampleBox.fromDomain({
    required Sample domain,
  }) =>
      SampleBox(self: domain!.self, data: json.encode(domain));

  @HiveField(0)
  String? self;
  @HiveField(1)
  String? data;
}

