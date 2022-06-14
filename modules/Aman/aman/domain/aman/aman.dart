import 'dart:convert';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hive/hive.dart';

part 'aman.freezed.dart';
part 'aman.g.dart';

@freezed
class Aman with _$Aman {
  @JsonSerializable(includeIfNull: false)
  const factory Aman({
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
  }) = _Aman;

  factory Aman.fromJson(Map<String, dynamic> json) =>
      _$AmanFromJson(json);
  
  factory Aman.fromBox({required AmanBox box}) =>
      Aman.fromJson(json.decode(box.data as String) as Map<String, dynamic>);    
}

@HiveType(typeId: 5, adapterName: 'AmanBoxAdapter')
class AmanBox {
  AmanBox({this.self, this.data});

  factory AmanBox.fromDomain({
    required Aman domain,
  }) =>
      AmanBox(self: domain!.self, data: json.encode(domain));

  @HiveField(0)
  String? self;
  @HiveField(1)
  String? data;
}

