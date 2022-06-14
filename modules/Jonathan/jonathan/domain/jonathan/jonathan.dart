import 'dart:convert';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hive/hive.dart';

part 'jonathan.freezed.dart';
part 'jonathan.g.dart';

@freezed
class Jonathan with _$Jonathan {
  @JsonSerializable(includeIfNull: false)
  const factory Jonathan({
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
  }) = _Jonathan;

  factory Jonathan.fromJson(Map<String, dynamic> json) =>
      _$JonathanFromJson(json);
  
  factory Jonathan.fromBox({required JonathanBox box}) =>
      Jonathan.fromJson(json.decode(box.data as String) as Map<String, dynamic>);    
}

@HiveType(typeId: 5, adapterName: 'JonathanBoxAdapter')
class JonathanBox {
  JonathanBox({this.self, this.data});

  factory JonathanBox.fromDomain({
    required Jonathan domain,
  }) =>
      JonathanBox(self: domain!.self, data: json.encode(domain));

  @HiveField(0)
  String? self;
  @HiveField(1)
  String? data;
}

